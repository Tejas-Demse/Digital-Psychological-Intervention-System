from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    """
    Custom permission to only allow administrators to access the view.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'admin')
