from django.db import models

class Resource(models.Model):
    TYPE_CHOICES = [
        ('article', 'Article'),
        ('video', 'Video'),
        ('exam_tip', 'Exam Tip'),
        ('wellness_guide', 'Wellness Guide')
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    content = models.TextField(blank=True, null=True) # Full text content if applicable
    content_url = models.URLField(blank=True, null=True) # External link if video or article
    category = models.CharField(max_length=100, blank=True, null=True) # e.g. "Anxiety", "Study Skills"
    language = models.CharField(max_length=30, default='English')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
