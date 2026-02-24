from rest_framework import serializers
from .models import Questionnaire, Question, UserSubmission

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'text', 'order']

class QuestionnaireSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Questionnaire
        fields = ['id', 'title', 'description', 'questions']

class UserSubmissionSerializer(serializers.ModelSerializer):
    questionnaire_title = serializers.CharField(source='questionnaire.title', read_only=True)
    
    class Meta:
        model = UserSubmission
        fields = ['id', 'questionnaire', 'questionnaire_title', 'total_score', 'severity_label', 'submitted_at', 'answers_json']
        read_only_fields = ['user', 'total_score', 'severity_label', 'submitted_at']
