from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Questionnaire, UserSubmission
from .serializers import QuestionnaireSerializer, UserSubmissionSerializer

class QuestionnaireDetailView(generics.RetrieveAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
    permission_classes = [permissions.IsAuthenticated]

class SubmitAssessmentView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        questionnaire_id = request.data.get('questionnaire_id')
        answers = request.data.get('answers', {}) # Expected dict: {"question_id": score_integer}
        
        questionnaire = get_object_or_404(Questionnaire, id=questionnaire_id)
        
        try:
            total_score = sum(int(score) for score in answers.values())
        except (ValueError, TypeError):
            return Response({"error": "Invalid answer format. Scores must be integers."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Clinical scale for severity
        title = questionnaire.title
        severity = "Unknown"
        
        if "PHQ-9" in title:
            if total_score <= 4: severity = "Minimal"
            elif total_score <= 9: severity = "Mild"
            elif total_score <= 14: severity = "Moderate"
            elif total_score <= 19: severity = "Moderately Severe"
            else: severity = "Severe"
        elif "GAD-7" in title:
            if total_score <= 4: severity = "Minimal"
            elif total_score <= 9: severity = "Mild"
            elif total_score <= 14: severity = "Moderate"
            else: severity = "Severe"
        elif "GHQ-12" in title:
            if total_score <= 11: severity = "Typical"
            elif total_score <= 15: severity = "Mild Distress"
            elif total_score <= 20: severity = "Moderate Distress"
            else: severity = "Severe Distress"
        else:
            if total_score <= 4: severity = "Minimal"
            elif total_score <= 9: severity = "Mild"
            elif total_score <= 14: severity = "Moderate"
            elif total_score <= 19: severity = "Moderately Severe"
            else: severity = "Severe"
            
        submission = UserSubmission.objects.create(
            user=request.user,
            questionnaire=questionnaire,
            total_score=total_score,
            severity_label=severity,
            answers_json=answers
        )
        
        serializer = UserSubmissionSerializer(submission)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserHistoryView(generics.ListAPIView):
    serializer_class = UserSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserSubmission.objects.filter(user=self.request.user)
