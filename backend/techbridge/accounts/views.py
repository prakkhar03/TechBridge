from django.db import transaction
from django.utils import timezone
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError as DjangoValidationError
from django.core.cache import cache

from rest_framework import status, serializers, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError

import logging

from accounts.utils import get_tokens_for_user 
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserDataSerializer,
    ProfileSerializer,
)

from .models import User, Profile

logger = logging.getLogger(__name__)

ATTEMPT_LIMIT = 3
COOLDOWN_SECONDS = 300


class RegisterView(APIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        try:
            with transaction.atomic():
                email = request.data.get("email")
                if not email:
                    return Response({"message": "Email is required"}, status=400)

                email = email.lower()
                try:
                    EmailValidator()(email)
                except DjangoValidationError:
                    return Response({"message": "Invalid email format"}, status=400)

                existing_user = User.objects.filter(email=email).first()
                if existing_user:
                    if not existing_user.verified:
                        tokens = get_tokens_for_user(existing_user)
                        # Temporarily commented out due to email configuration issues
                        # send_verification_email(existing_user, tokens['access'])
                        return Response({
                            "message": "User exists but not verified. Email verification temporarily disabled.",
                            "data": {
                                "user": UserDataSerializer(existing_user).data,
                                "tokens": tokens
                            }
                        }, status=403)
                    return Response({"message": "Email already registered"}, status=409)

                serializer.is_valid(raise_exception=True)
                user = serializer.save()
                tokens = get_tokens_for_user(user)
                # Temporarily commented out due to email configuration issues
                # send_verification_email(user, tokens['access'])

                return Response({
                    "status": 201,
                    "message": "User created successfully. Email verification temporarily disabled.",
                    "data": {
                        "user": UserDataSerializer(user).data,
                        "tokens": tokens
                    }
                }, status=201)
        except Exception as e:
            logger.error(f"Registration error: {str(e)}")
            return Response({"message": "Error during registration", "error": str(e)}, status=500)


class VerifyEmailView(APIView):
    def get(self, request, token):
        try:
            access_token = AccessToken(token)
            user_id = access_token["user_id"]
            user = User.objects.get(id=user_id)

            if user.verified:
                return Response({"message": "Email already verified"}, status=200)

            user.verified = True
            user.onboarding_stage = 1
            user.save()

            return Response({"message": "Email verified successfully"}, status=200)

        except Exception as e:
            logger.error(f"Email verification error: {str(e)}")
            return Response({"message": "Invalid or expired token"}, status=400)


class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        email = request.data.get("email", "").lower()
        cache_key_attempts = f"login_attempts_{email}"
        cache_key_blocked = f"login_blocked_{email}"

        if cache.get(cache_key_blocked):
            return Response({"message": "Too many failed attempts. Try again later."}, status=429)

        serializer = self.serializer_class(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.context['user']
            if not user.verified:
                tokens = get_tokens_for_user(user)
                # Temporarily commented out due to email configuration issues
                # send_verification_email(user, tokens['access'])
                return Response({"message": "Email not verified. Email verification temporarily disabled."}, status=403)

            cache.delete(cache_key_attempts)
            cache.delete(cache_key_blocked)

            user.last_login = timezone.now()
            user.save()
            tokens = get_tokens_for_user(user)

            return Response({
                "message": "Login successful",
                "data": {
                    "user": UserDataSerializer(user).data,
                    "tokens": tokens
                }
            }, status=200)
        except serializers.ValidationError as e:
            attempts = cache.get(cache_key_attempts, 0) + 1
            cache.set(cache_key_attempts, attempts, timeout=COOLDOWN_SECONDS)

            if attempts >= ATTEMPT_LIMIT:
                cache.set(cache_key_blocked, True, timeout=COOLDOWN_SECONDS)
                user = User.objects.filter(email=email).first()
                if user:
                    # Temporarily commented out due to email configuration issues
                    # send_login_alert_email(user)
                    pass

            return Response({"message": "Invalid credentials", "errors": e.detail}, status=400)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"message": "Refresh token required"}, status=400)
            try:
                RefreshToken(refresh_token).blacklist()
            except TokenError:
                return Response({"message": "Invalid token"}, status=400)

            return Response({"message": "Logged out successfully"}, status=205)
        except Exception as e:
            logger.error(f"Logout error: {str(e)}")
            return Response({"message": "Error during logout", "error": str(e)}, status=500)




class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return the logged-in user's profile
        return Profile.objects.filter(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        # Always return logged-in user's profile (no ID required)
        profile = request.user.profile
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        # Update logged-in user's own profile
        profile = request.user.profile

        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # If onboarding stage is < 2, move forward
        user = request.user
        if user.onboarding_stage < 2:
            user.onboarding_stage = 2
            user.save()

        return Response({
            "message": "Profile updated successfully",
            "profile": serializer.data,
            "onboarding_stage": user.onboarding_stage
        }, status=status.HTTP_200_OK)
