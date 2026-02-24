import urllib.request
import json
import urllib.error

url = 'http://127.0.0.1:8000/api/users/register/'
data = {
    "username": "newstudent777",
    "email": "newstudent777@demo.com",
    "password": "securepassword123",
    "role": "student",
    "department": "Psychology"
}

req = urllib.request.Request(url, headers={'Content-Type': 'application/json'}, method='POST')
req.data = json.dumps(data).encode('utf-8')

try:
    with urllib.request.urlopen(req) as response:
        print("Status:", response.status)
        print("Response:", response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("Error:", e.code)
    print("Details:", e.read().decode('utf-8'))
except Exception as e:
    print("Exception:", str(e))
