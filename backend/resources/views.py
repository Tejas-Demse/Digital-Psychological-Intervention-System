from rest_framework import generics, permissions
from .models import Resource
from .serializers import ResourceSerializer

class ResourceListView(generics.ListAPIView):
    serializer_class = ResourceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Resource.objects.all().order_by('-created_at')
        type_param = self.request.query_params.get('type', None)
        category_param = self.request.query_params.get('category', None)
        
        if type_param:
            queryset = queryset.filter(type=type_param)
        if category_param:
            queryset = queryset.filter(category=category_param)
            
        return queryset
