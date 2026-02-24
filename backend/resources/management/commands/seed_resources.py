# resources/management/commands/seed_resources.py
from django.core.management.base import BaseCommand
from resources.models import Resource

class Command(BaseCommand):
    help = 'Seeds the database with educational resources'

    def handle(self, *args, **kwargs):
        resources_data = [
            {
                "title": "Understanding and Managing Academic Anxiety",
                "description": "A comprehensive guide to recognizing the signs of academic anxiety and practical steps to manage it.",
                "type": "article",
                "content": "Detailed text about managing academic workload... (Mock content)",
                "category": "Anxiety"
            },
            {
                "title": "5-Minute Guided Meditation for Focus",
                "description": "Quick mindfulness exercise to help center your thoughts before studying.",
                "type": "video",
                "content_url": "https://www.youtube.com/watch?v=inpok4MKVLM",
                "category": "Mindfulness"
            },
            {
                "title": "Effective Last-Minute Revision Strategies",
                "description": "How to maximize retention when you're short on time.",
                "type": "exam_tip",
                "content": "1. Focus on core concepts. 2. Use active recall. 3. Get adequate sleep...",
                "category": "Study Skills"
            },
            {
                "title": "The Importance of Sleep for Cognitive Function",
                "description": "Why pulling an all-nighter is harmful to your exam performance.",
                "type": "wellness_guide",
                "content": "Scientific studies show that sleep deprivation impairs memory consolidation...",
                "category": "Wellness"
            },
            {
                "title": "Coping with Imposter Syndrome in College",
                "description": "Understanding why you feel you don't belong, and how to rewrite that narrative.",
                "type": "article",
                "content": "Many high-achieving individuals struggle with imposter syndrome...",
                "category": "Mental Health"
            }
        ]

        count = 0
        for data in resources_data:
            obj, created = Resource.objects.get_or_create(title=data["title"], defaults=data)
            if created:
                count += 1
        
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {count} new resources.'))
