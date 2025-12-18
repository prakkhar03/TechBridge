from django.urls import path
from .views import (
    QuestionListAPI, 
    SubmitPersonalityTestAPI,
    UserProgressAPI
)

urlpatterns = [
    path("questions/", QuestionListAPI.as_view()),
    path("submit/", SubmitPersonalityTestAPI.as_view()),
    path("progress/", UserProgressAPI.as_view()),
]
