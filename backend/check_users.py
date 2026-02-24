import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mindcare.settings")
django.setup()

import json
from users.models import CustomUser as User

users = [
    {
        'id': u.id, 
        'username': u.username, 
        'email': u.email, 
        'demo123': u.check_password('demo123'), 
        'student123': u.check_password('student123'),
        'securepassword123': u.check_password('securepassword123')
    } 
    for u in User.objects.all()
]
print(json.dumps(users, indent=2))
