from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Question, Option, PersonalityResult
from .serializers import QuestionSerializer
from .services import calculate_learning_level


class QuestionListAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        questions = Question.objects.prefetch_related("options").order_by("order")
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)


class SubmitPersonalityTestAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        answers = request.data.get("answers", [])
        total_score = 0

        for ans in answers:
            option = Option.objects.get(
                id=ans["option_id"],
                question_id=ans["question_id"]
            )
            total_score += option.score

        learning_level = calculate_learning_level(total_score)

        PersonalityResult.objects.update_or_create(
            user=request.user,
            defaults={
                "total_score": total_score,
                "learning_level": learning_level
            }
        )

        profile = request.user.profile
        profile.learning_rate = learning_level
        profile.save()

        request.user.onboarding_stage = 3
        request.user.save()

        return Response({
            "message": "Test submitted successfully",
            "learning_level": learning_level,
            "score": total_score
        })


class UserProgressAPI(APIView):
    """Get user's progress and assessment history"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # Get personality result (Phase 1)
        personality_result = None
        try:
            pr = PersonalityResult.objects.get(user=user)
            personality_result = {
                "learning_level": pr.learning_level,
                "total_score": pr.total_score,
                "completed_at": pr.created_at.isoformat()
            }
        except PersonalityResult.DoesNotExist:
            pass
        
        # Get learning modules (Phase 2)
        from modules.models import LearningModule, ModuleTestAttempt
        
        modules = LearningModule.objects.filter(user=user).order_by('-created_at')
        modules_data = []
        for module in modules:
            # Get latest test attempt for this module
            latest_attempt = ModuleTestAttempt.objects.filter(
                module=module, user=user
            ).order_by('-created_at').first()
            
            modules_data.append({
                "id": module.id,
                "topic": module.topic,
                "difficulty": module.difficulty,
                "is_completed": module.is_completed,
                "retry_count": module.retry_count,
                "created_at": module.created_at.isoformat(),
                "latest_test": {
                    "score": latest_attempt.score if latest_attempt else None,
                    "percentage": latest_attempt.percentage if latest_attempt else None,
                    "passed": latest_attempt.passed if latest_attempt else None,
                    "date": latest_attempt.created_at.isoformat() if latest_attempt else None
                } if latest_attempt else None
            })
        
        # Get recent activity (last 10 events)
        recent_activity = []
        
        # Add personality test to activity if exists
        if personality_result:
            recent_activity.append({
                "type": "personality_test",
                "title": "Completed Personality Assessment",
                "description": f"Learning level: {personality_result['learning_level']}",
                "date": personality_result['completed_at']
            })
        
        # Add modules to activity
        for module in modules[:5]:
            recent_activity.append({
                "type": "module_created",
                "title": f"Started learning: {module.topic}",
                "description": f"Difficulty: {module.difficulty}",
                "date": module.created_at.isoformat()
            })
        
        # Add test attempts to activity
        all_attempts = ModuleTestAttempt.objects.filter(user=user).order_by('-created_at')[:5]
        for attempt in all_attempts:
            recent_activity.append({
                "type": "test_attempt",
                "title": f"{'Passed' if attempt.passed else 'Attempted'}: {attempt.module.topic} Test",
                "description": f"Score: {attempt.percentage:.0f}%",
                "date": attempt.created_at.isoformat()
            })
        
        # Sort by date
        recent_activity.sort(key=lambda x: x['date'], reverse=True)
        
        return Response({
            "personality_result": personality_result,
            "modules": modules_data,
            "recent_activity": recent_activity[:10],
            "stats": {
                "total_modules": len(modules_data),
                "completed_modules": sum(1 for m in modules_data if m['is_completed']),
                "learning_level": personality_result['learning_level'] if personality_result else None
            }
        })
