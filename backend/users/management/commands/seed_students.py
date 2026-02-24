from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import random

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with 10 dummy students'

    def handle(self, *args, **kwargs):
        departments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Information Technology', 'Civil Engineering']
        
        count = 0
        for i in range(1, 11):
            username = f'student{i}@demo.com'
            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(
                    username=username,
                    email=username,
                    password='student123',
                )
                user.role = 'student'
                user.first_name = f'Demo'
                user.last_name = f'Student {i}'
                user.department = random.choice(departments)
                user.contact_number = f'98765432{i:02d}'
                user.save()
                
                count += 1
                
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {count} new students.'))
