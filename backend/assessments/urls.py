from django.urls import path
from .views import QuestionnaireDetailView, SubmitAssessmentView, UserHistoryView

urlpatterns = [
    path('history/', UserHistoryView.as_view(), name='assessment-history'),
    path('submit/', SubmitAssessmentView.as_view(), name='assessment-submit'),
    path('<int:pk>/', QuestionnaireDetailView.as_view(), name='assessment-detail'),
]
