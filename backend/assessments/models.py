from django.db import models
from django.conf import settings

class Questionnaire(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.title

class Question(models.Model):
    questionnaire = models.ForeignKey(Questionnaire, related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=500)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        
    def __str__(self):
        return f"{self.questionnaire.title} - Q{self.order}: {self.text}"

class UserSubmission(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='submissions', on_delete=models.CASCADE)
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE)
    total_score = models.IntegerField()
    severity_label = models.CharField(max_length=100)
    submitted_at = models.DateTimeField(auto_now_add=True)
    answers_json = models.JSONField(default=dict)
    
    class Meta:
        ordering = ['-submitted_at']
        
    def __str__(self):
        return f"{self.user.username} - {self.questionnaire.title} - Score: {self.total_score}"
