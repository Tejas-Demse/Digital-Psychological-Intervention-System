import urllib.request
import json
import urllib.error

base_url = 'http://127.0.0.1:8000/api'

def fetch_url(url, method='GET', data=None, token=None):
    headers = {'Content-Type': 'application/json'}
    if token:
        headers['Authorization'] = f'Bearer {token}'
        
    req = urllib.request.Request(url, headers=headers, method=method)
    if data:
        req.data = json.dumps(data).encode('utf-8')
        
    try:
        with urllib.request.urlopen(req) as response:
            return response.status, json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8')

def run_tests():
    print("--- 🩺 Starting API Verification Checks ---")
    
    # 1. Authenticate
    print("\n[1] Authenticating as student@demo.com...")
    status, data = fetch_url(f"{base_url}/users/login/", method='POST', data={"username": "student@demo.com", "password": "demo123"})
    if status != 200:
        print(f"⚠️ 'demo123' failed. Trying secondary password 'student123'...")
        status, data = fetch_url(f"{base_url}/users/login/", method='POST', data={"username": "student@demo.com", "password": "student123"})
    
    if status != 200:
        print(f"❌ Login Failed Completely! Status: {status}")
        return
    
    token = data.get('access')
    print("✅ Authenticated successfully.")

    # 2. Check Resources
    print("\n[2] Fetching /api/resources/ ...")
    status, data = fetch_url(f"{base_url}/resources/", token=token)
    if status == 200:
        print(f"✅ Success! Found {len(data)} Resources.")
        if data: print(f"   -> Sample: '{data[0].get('title')}' (Language: {data[0].get('language')})")
    else:
        print(f"❌ Resources fetch failed. Status: {status}")

    # 3. Check Community Posts
    print("\n[3] Fetching /api/community/posts/ ...")
    status, data = fetch_url(f"{base_url}/community/posts/", token=token)
    if status == 200:
        print(f"✅ Success! Found {len(data)} Community Posts.")
        if data: print(f"   -> Sample: '{data[0].get('topic')}'")
    else:
        print(f"❌ Community fetch failed. Status: {status}")

    # 4. Check Profile
    print("\n[4] Checking Profile Endpoint /api/users/profile/ ...")
    status, data = fetch_url(f"{base_url}/users/profile/", token=token)
    if status == 200:
        print("✅ Success! Profile fetched.")
        print(f"   -> Data: {json.dumps(data, indent=2)}")
    else:
        print(f"❌ Profile fetch failed. Status: {status}")

    print("\n--- ✅ All Verification Checks Complete! ---")

if __name__ == '__main__':
    run_tests()
