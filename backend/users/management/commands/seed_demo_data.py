import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from users.models import CustomUser
from resources.models import Resource
from community.models import Post
from appointments.models import TimeSlot, Appointment

class Command(BaseCommand):
    help = 'Seeds the database with high-quality demo data for evaluator presentation'

    def handle(self, *args, **kwargs):
        self.stdout.write('Starting demo data seeding...')

        # 1. Create or Get Demo Users
        counselor, _ = CustomUser.objects.get_or_create(
            username='Dr. Sarah Jenkins',
            email='counselor@demo.com',
            defaults={
                'role': 'counselor',
                'first_name': 'Sarah',
                'last_name': 'Jenkins',
                'department': 'Psychology',
                'contact_number': '+1-555-0199'
            }
        )
        if _: counselor.set_password('demo123'); counselor.save()

        student, _ = CustomUser.objects.get_or_create(
            username='Alex Student',
            email='student@demo.com',
            defaults={
                'role': 'student',
                'first_name': 'Alex',
                'last_name': 'Student',
                'department': 'Computer Science',
                'contact_number': '+1-555-0123'
            }
        )
        if _: student.set_password('demo123'); student.save()

        # 2. Seed Resources (High Quality)
        Resource.objects.all().delete()
        resources_data = [
            {
                'title': 'Overcoming End-of-Semester Burnout',
                'description': 'A comprehensive guide on managing stress during finals week, including time-blocking techniques and active rest strategies.',
                'type': 'article',
                'category': 'Academic Stress',
                'language': 'English'
            },
            {
                'title': 'Guided 10-Minute Mindfulness Meditation',
                'description': 'A soothing audio track to help center your thoughts before a major presentation or exam.',
                'type': 'audio',
                'category': 'Mindfulness',
                'language': 'English'
            },
            {
                'title': 'Understanding and Managing Panic Attacks',
                'description': 'Learn the clinical signs of panic and practical grounding techniques (like 5-4-3-2-1) to regain control.',
                'type': 'video',
                'category': 'Anxiety',
                'language': 'English'
            },
            {
                'title': 'परीक्षा के तनाव को कैसे कम करें (How to Reduce Exam Stress)',
                'description': 'परीक्षा के दौरान मानसिक शांति बनाए रखने के लिए महत्वपूर्ण टिप्स और ट्रिक्स।',
                'type': 'guide',
                'category': 'Academic Stress',
                'language': 'Hindi'
            },
            {
                'title': 'The Pomodoro Technique Explained',
                'description': 'Boost your productivity and maintain focus by working in structured 25-minute intervals.',
                'type': 'exam_tip',
                'category': 'Study Skills',
                'language': 'English'
            },
            {
                'title': 'Deep Sleep Relaxation Protocol',
                'description': 'Struggling with insomnia before exams? Listen to this binaural beats track designed to induce deep REM sleep.',
                'type': 'audio',
                'category': 'Relaxation',
                'language': 'English'
            },
            {
                'title': 'Building Healthy Tech Habits in College',
                'description': 'How to set boundaries with your digital devices to prevent doom-scrolling and improve mental clarity.',
                'type': 'wellness_guide',
                'category': 'Wellness',
                'language': 'English'
            }
        ]
        
        for r_data in resources_data:
            Resource.objects.create(**r_data)
        self.stdout.write(f'Created {len(resources_data)} Resources.')

        # 3. Seed Peer Support Community Posts
        Post.objects.all().delete()
        community_posts = [
            {
                'author': student,
                'topic': 'Struggling with Imposter Syndrome in CS',
                'content': 'Does anyone else feel like everyone around them understands coding concepts instantly, while you\'re left behind? I\'m a junior and still feel like I don\'t know what I\'m doing half the time.',
                'is_anonymous': True,
                'tags': ['Anxiety', 'Academics'],
                'likes': 14
            },
            {
                'author': counselor,
                'topic': 'Reminder: Midterm Wellness Check-ins Available!',
                'content': 'Just a quick reminder that the counseling center has opened extra drop-in slots for the next two weeks. You don\'t need to be in crisis to talk to someone—sometimes just venting helps! Booking link is active in the portal.',
                'is_anonymous': False,
                'tags': ['Announcements', 'Wellness'],
                'likes': 32
            },
            {
                'author': student,
                'topic': 'Hackathon Team Falling Apart - Stress Level 100',
                'content': 'We have 24 hours left on our project and two team members ghosted. I\'m trying to do the backend and frontend simultaneously and I feel incredibly overwhelmed right now. Need some encouragement.',
                'is_anonymous': False,
                'tags': ['Stress', 'Venting'],
                'likes': 8
            },
            {
                'author': student,
                'topic': 'What are your best sleep tips for finals?',
                'content': 'I\'ve been running on 4 hours of sleep and immense amounts of coffee. I know it\'s bad, but every time I try to sleep my brain just races with everything I need to review. What works for you all?',
                'is_anonymous': True,
                'tags': ['Sleep', 'Advice'],
                'likes': 21
            }
        ]
        
        for p_data in community_posts:
            # We must assign the created_at after creation since auto_now_add overrides it during creation
            post = Post.objects.create(**p_data)
            # Scatter timestamps across the last few days
            post.created_at = timezone.now() - timedelta(hours=random.randint(1, 48))
            post.save()
            
        self.stdout.write(f'Created {len(community_posts)} Community Posts.')

        # 4. Seed Appointments
        Appointment.objects.all().delete()
        TimeSlot.objects.all().delete()

        # Create past completed appointment
        past_slot = TimeSlot.objects.create(
            counselor=counselor,
            start_time=timezone.now() - timedelta(days=2, hours=2),
            end_time=timezone.now() - timedelta(days=2, hours=1),
            is_booked=True
        )
        Appointment.objects.create(
            student=student,
            time_slot=past_slot,
            status='completed',
            notes='Discussed academic pressure and introduced basic mindfulness techniques. Student agreed to try the Pomodoro method for studies.'
        )

        # Create upcoming scheduled appointment
        future_slot = TimeSlot.objects.create(
            counselor=counselor,
            start_time=timezone.now() + timedelta(days=1, hours=10), # Tomorrow, 10 AM (relative)
            end_time=timezone.now() + timedelta(days=1, hours=11),
            is_booked=True
        )
        Appointment.objects.create(
            student=student,
            time_slot=future_slot,
            status='scheduled',
            meeting_link='https://meet.google.com/demo-counseling-room'
        )

        # Create available time slots for the student to potentially book
        for i in range(2, 5):
            TimeSlot.objects.create(
                counselor=counselor,
                start_time=timezone.now() + timedelta(days=i, hours=14), # 2 PM slots
                end_time=timezone.now() + timedelta(days=i, hours=15),
                is_booked=False
            )

        self.stdout.write('Created Appointments and TimeSlots.')
        
        self.stdout.write(self.style.SUCCESS('\\n✅ Database successfully seeded with demo data!'))
