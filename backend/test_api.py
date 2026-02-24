import urllib.request, json, sys, ssl

try:
    req = urllib.request.Request('http://127.0.0.1:8000/api/users/login/', data=json.dumps({'username':'student@demo.com', 'password':'student123'}).encode(), headers={'Content-Type': 'application/json'})
    token = json.loads(urllib.request.urlopen(req).read().decode())['access']
    req2 = urllib.request.Request('http://127.0.0.1:8000/api/appointments/available/', headers={'Authorization': 'Bearer ' + token})
    print(urllib.request.urlopen(req2).read().decode())
except urllib.error.HTTPError as e:
    html = e.read().decode()
    if 'ImproperlyConfigured' in html:
        lines = html.split('\n')
        for i, line in enumerate(lines):
            if 'ImproperlyConfigured' in line:
                print(line.strip())
                for j in range(1, 10):
                    if i + j < len(lines):
                        print(lines[i+j].strip())
                break
except Exception as e:
    print(str(e))
