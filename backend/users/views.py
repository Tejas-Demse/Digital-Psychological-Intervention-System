from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import (
    UserRegistrationSerializer, 
    UserProfileSerializer, 
    CustomTokenObtainPairSerializer
)
from .permissions import IsAdmin, IsCounselor
from appointments.models import Appointment

User = get_user_model()

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = (permissions.AllowAny,)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

class AdminDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def get(self, request, *args, **kwargs):
        total_users = User.objects.count()
        active_counselors = User.objects.filter(role='counselor').count()
        total_appointments = Appointment.objects.count()
        
        # Simplified for now: just count all scheduled appointments
        upcoming_appointments = Appointment.objects.filter(status='scheduled').count()

        data = {
            'total_users': total_users,
            'active_counselors': active_counselors,
            'total_appointments': total_appointments,
            'upcoming_appointments': upcoming_appointments,
        }
        return Response(data, status=status.HTTP_200_OK)

class SOSAlertView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        user.is_at_risk = True
        user.save()
        return Response({"message": "SOS Alert triggered successfully. Our team has been notified."}, status=status.HTTP_200_OK)

class AtRiskStudentsView(generics.ListAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsCounselor]

    def get_queryset(self):
        return User.objects.filter(is_at_risk=True)
