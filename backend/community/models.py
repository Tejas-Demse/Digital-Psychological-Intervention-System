from django.db import models
from django.conf import settings

class Post(models.Model):
    # If the user is deleted, their posts shouldn't disappear but be marked anonymous or we can cascade delete. Simple cascade for now.
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='community_posts')
    topic = models.CharField(max_length=255)
    content = models.TextField()
    is_anonymous = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.JSONField(default=list, blank=True) # Array of strings
    
    # Simple like counter instead of a mapping table for MVP
    likes = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'community_post'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.topic} by {self.author.username}"
