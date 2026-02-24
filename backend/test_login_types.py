import urllib.request
import json
import urllib.error

def test_login(username, password):
    url = 'http://127.0.0.1:8000/api/users/login/'
    data = {"username": username, "password": password}
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as response:
            print(f"Login with '{username}':", response.status, "SUCCESS")
    except urllib.error.HTTPError as e:
        print(f"Login with '{username}':", e.code, e.read().decode('utf-8'))

test_login("student@demo.com", "demo123")
test_login("Alex Student", "demo123")
test_login("newstudent777@demo.com", "securepassword123")
test_login("newstudent777", "securepassword123")
