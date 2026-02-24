from rest_framework import serializers
from users.models import CustomUser
from .models import TimeSlot, Appointment

class CounselorBriefSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'department']
        
    def get_name(self, obj):
        if obj.first_name and obj.last_name:
            return f"Dr. {obj.first_name} {obj.last_name}"
        return f"Dr. {obj.last_name or obj.username}"

class TimeSlotSerializer(serializers.ModelSerializer):
    counselor = CounselorBriefSerializer(read_only=True)
    counselor_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(role='counselor'), 
        source='counselor', 
        write_only=True
    )

    class Meta:
        model = TimeSlot
        fields = ['id', 'counselor', 'counselor_id', 'start_time', 'end_time', 'is_booked']

class AppointmentSerializer(serializers.ModelSerializer):
    time_slot = TimeSlotSerializer(read_only=True)
    time_slot_id = serializers.PrimaryKeyRelatedField(
        queryset=TimeSlot.objects.filter(is_booked=False), 
        source='time_slot', 
        write_only=True
    )

    class Meta:
        model = Appointment
        fields = ['id', 'student', 'time_slot', 'time_slot_id', 'status', 'meeting_link', 'notes', 'created_at']
        read_only_fields = ['student', 'status', 'meeting_link', 'created_at']
