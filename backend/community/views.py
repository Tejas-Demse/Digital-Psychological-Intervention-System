from rest_framework import generics, permissions
from .models import Post
from .serializers import PostSerializer

class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Post.objects.all().order_by('-created_at')
        tag = self.request.query_params.get('tag')
        
        # Exact case-sensitive match inside JSON array for simplicity
        if tag and tag != 'All':
            # Note: JSONField filtering syntax might vary by DB, but for sqlite/postgres this is a quick approximation
            queryset = queryset.filter(tags__contains=tag)
            
        return queryset

    def perform_create(self, serializer):
        # Tags could be sent as string array
        serializer.save(author=self.request.user)
