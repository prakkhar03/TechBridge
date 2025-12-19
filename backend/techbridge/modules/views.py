from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import (
    LearningModule,
    ModuleTest,
    ModuleTestAttempt
)
from .serializers import (
    LearningModuleSerializer,
    ModuleTestSerializer
)
from .services import (
    map_learning_level_to_difficulty,
    evaluate_test
)
from .gemini import (
    generate_module_content,
    generate_test,
    generate_detailed_roadmap
)


class GenerateModuleAPI(APIView):
   
    permission_classes = [IsAuthenticated]

    def post(self, request):
        topic = request.data.get("topic")

        if not topic:
            return Response(
                {"error": "Topic is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        profile = request.user.profile
        learning_level = profile.learning_rate

        difficulty = map_learning_level_to_difficulty(learning_level)

        content = generate_module_content(topic, difficulty)

        module = LearningModule.objects.create(
            user=request.user,
            topic=topic,
            difficulty=difficulty,
            content=content
        )

        questions = generate_test(topic, difficulty)

        test = ModuleTest.objects.create(
            module=module,
            questions=questions
        )

        return Response(
            {
                "module": LearningModuleSerializer(module).data,
                "test": ModuleTestSerializer(test).data
            },
            status=status.HTTP_201_CREATED
        )


class ModuleDetailAPI(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request, module_id):
        try:
            module = LearningModule.objects.get(
                id=module_id,
                user=request.user
            )
        except LearningModule.DoesNotExist:
            return Response(
                {"error": "Module not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = LearningModuleSerializer(module)
        return Response(serializer.data)


class ModuleTestDetailAPI(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request, module_id):
        try:
            module = LearningModule.objects.get(
                id=module_id,
                user=request.user
            )
            test = ModuleTest.objects.get(module=module)
        except (LearningModule.DoesNotExist, ModuleTest.DoesNotExist):
            return Response(
                {"error": "Test not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ModuleTestSerializer(test)
        return Response(serializer.data)


class SubmitModuleTestAPI(APIView):
    
    permission_classes = [IsAuthenticated]

    def post(self, request, module_id):
        try:
            module = LearningModule.objects.get(
                id=module_id,
                user=request.user
            )
            test = ModuleTest.objects.get(module=module)
        except (LearningModule.DoesNotExist, ModuleTest.DoesNotExist):
            return Response(
                {"error": "Module or test not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        user_answers = request.data.get("answers")

        if not user_answers:
            return Response(
                {"error": "Answers are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        score, percentage = evaluate_test(
            test.questions,
            user_answers
        )

        passed = percentage >= test.pass_percentage

        ModuleTestAttempt.objects.create(
            module=module,
            user=request.user,
            score=score,
            percentage=percentage,
            passed=passed
        )

        if passed:
            module.is_completed = True
        else:
            module.retry_count += 1

        module.save()

        return Response(
            {
                "passed": passed,
                "score": score,
                "percentage": percentage,
                "retry_count": module.retry_count,
                "module_completed": module.is_completed
            },
            status=status.HTTP_200_OK
        )


class RegenerateTestAPI(APIView):
   
    permission_classes = [IsAuthenticated]

    def post(self, request, module_id):
        try:
            module = LearningModule.objects.get(
                id=module_id,
                user=request.user
            )
            test = ModuleTest.objects.get(module=module)
        except (LearningModule.DoesNotExist, ModuleTest.DoesNotExist):
            return Response(
                {"error": "Module or test not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        new_questions = generate_test(
            module.topic,
            module.difficulty
        )

        test.questions = new_questions
        test.save()

        return Response(
            {
                "message": "New test generated successfully",
                "test": ModuleTestSerializer(test).data
            },
            status=status.HTTP_200_OK
        )


class SearchLearningPathAPI(APIView):
    """API for searching and generating a detailed learning roadmap."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        topic = request.data.get("topic")
        if not topic:
            return Response(
                {"error": "Topic is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Generate comprehensive content
        content = generate_detailed_roadmap(topic)

        # Determine difficulty based on learner profile
        difficulty = "intermediate"
        try:
            profile = request.user.profile
            difficulty = map_learning_level_to_difficulty(profile.learning_rate)
        except Exception:
            pass

        # Save to database so user can revisit
        module = LearningModule.objects.create(
            user=request.user,
            topic=topic,
            difficulty=difficulty,
            content=content
        )

        return Response(
            {
                "message": "Learning roadmap generated successfully",
                "module": LearningModuleSerializer(module).data
            },
            status=status.HTTP_201_CREATED
        )


class UserLearningHistoryAPI(APIView):
    """API to fetch user's previous learning path modules."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        modules = LearningModule.objects.filter(
            user=request.user
        ).order_by('-created_at')
        
        return Response(
            LearningModuleSerializer(modules, many=True).data,
            status=status.HTTP_200_OK
        )
