from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField(read_only=True)
    is_volunteer = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'author', 'author_name', 'is_volunteer', 'topic', 'content', 'is_anonymous', 'created_at', 'tags', 'likes']
        read_only_fields = ['author', 'likes', 'created_at']

    def get_author_name(self, obj):
        if obj.is_anonymous:
            return "Anonymous Student"
        
        name = f"{obj.author.first_name} {obj.author.last_name}".strip()
        if not name:
            name = obj.author.username
            
        if obj.author.role == 'counselor':
            return f"Dr. {name}"
        elif obj.author.role == 'admin':
            return f"Admin {name}"
        return name

    def get_is_volunteer(self, obj):
        # We assume counselors or admins act as "volunteers" for the forum badge logic.
        return obj.author.role in ['counselor', 'admin']
