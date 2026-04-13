from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.utils import timezone
from users.permissions import IsCounselor
from .models import TimeSlot, Appointment
from .serializers import TimeSlotSerializer, AppointmentSerializer, TimeSlotCreateSerializer
import uuid

class AvailableTimeSlotsView(generics.ListAPIView):
    serializer_class = TimeSlotSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return only future slots that haven't been booked yet
        now = timezone.now()
        return TimeSlot.objects.filter(is_booked=False, start_time__gte=now).order_by('start_time')

class BookAppointmentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        time_slot_id = request.data.get('time_slot_id')
        notes = request.data.get('notes', '')

        if not time_slot_id:
            return Response({"error": "time_slot_id is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Get slot and ensure it's not already booked
        time_slot = get_object_or_404(TimeSlot, id=time_slot_id)
        if time_slot.is_booked:
            return Response({"error": "This time slot has already been booked."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Verify it's a future slot
        if time_slot.start_time < timezone.now():
             return Response({"error": "Cannot book an appointment in the past."}, status=status.HTTP_400_BAD_REQUEST)

        # Mark slot as booked
        time_slot.is_booked = True
        time_slot.save()

        # Generate a mock meeting link
        meeting_id = str(uuid.uuid4())[:8]
        meeting_link = f"https://meet.mindcare.local/{meeting_id}"

        # Create appointment
        appointment = Appointment.objects.create(
            student=request.user,
            time_slot=time_slot,
            status='scheduled',
            meeting_link=meeting_link,
            notes=notes
        )

        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class TimeSlotListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsCounselor]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TimeSlotCreateSerializer
        return TimeSlotSerializer

    def get_queryset(self):
        return TimeSlot.objects.filter(counselor=self.request.user).order_by('start_time')

    def perform_create(self, serializer):
        serializer.save(counselor=self.request.user)

class TimeSlotDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = TimeSlotSerializer
    permission_classes = [permissions.IsAuthenticated, IsCounselor]

    def get_queryset(self):
        return TimeSlot.objects.filter(counselor=self.request.user)

class CounselorAppointmentsView(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsCounselor]

    def get_queryset(self):
        return Appointment.objects.filter(time_slot__counselor=self.request.user).order_by('time_slot__start_time')
