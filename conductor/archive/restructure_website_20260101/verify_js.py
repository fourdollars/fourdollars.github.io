import os
import sys

def verify_js():
    js_path = "assets/js/feeds.js"
    
    if not os.path.exists(js_path):
        print(f"[FAIL] JS file {js_path} does not exist.")
        return False
        
    with open(js_path, 'r') as f:
        content = f.read()
        
    if "api.github.com" not in content:
        print("[FAIL] JS does not contain GitHub API reference.")
        return False
        
    print("[PASS] JS file exists and contains GitHub integration logic.")
    return True

if __name__ == "__main__":
    if not verify_js():
        sys.exit(1)
    sys.exit(0)
