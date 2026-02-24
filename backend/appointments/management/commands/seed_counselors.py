from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from appointments.models import TimeSlot
from datetime import datetime, timedelta
import random

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with 3 counselors and available time slots'

    def handle(self, *args, **kwargs):
        counselors_data = [
            {'email': 'dr.smith@demo.com', 'first': 'Sarah', 'last': 'Smith', 'dept': 'Clinical Psychology'},
            {'email': 'dr.jones@demo.com', 'first': 'James', 'last': 'Jones', 'dept': 'Student Counseling'},
            {'email': 'dr.lee@demo.com', 'first': 'Amanda', 'last': 'Lee', 'dept': 'Psychiatry'}
        ]
        
        counselor_objs = []
        for c in counselors_data:
            user, created = User.objects.get_or_create(
                username=c['email'],
                defaults={
                    'email': c['email'],
                    'role': 'counselor',
                    'first_name': c['first'],
                    'last_name': c['last'],
                    'department': c['dept'],
                    'contact_number': '555-0100'
                }
            )
            if created:
                user.set_password('counselor123')
                user.save()
            counselor_objs.append(user)

        # Generate some time slots for the next 7 days for each counselor
        TimeSlot.objects.all().delete() # Clean up old slots for a fresh start
        
        slots_created = 0
        today = datetime.now().replace(microsecond=0, second=0, minute=0)
        
        for counselor in counselor_objs:
            for day_offset in range(1, 8): # Next 7 days
                day = today + timedelta(days=day_offset)
                
                # Each counselor has 3 random slots per day
                hours = random.sample(range(9, 16), 3) # 9 AM to 3 PM
                for hour in hours:
                    start_time = day.replace(hour=hour)
                    end_time = start_time + timedelta(hours=1)
                    
                    TimeSlot.objects.create(
                        counselor=counselor,
                        start_time=start_time,
                        end_time=end_time,
                        is_booked=False
                    )
                    slots_created += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {len(counselor_objs)} counselors and {slots_created} time slots.'))
