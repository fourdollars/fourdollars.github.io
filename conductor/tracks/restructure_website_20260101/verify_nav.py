import os
import sys

def verify_navigation():
    nav_path = "_includes/navigation.html"
    
    if not os.path.exists(nav_path):
        print(f"[FAIL] Navigation file {nav_path} does not exist.")
        return False
        
    with open(nav_path, 'r') as f:
        content = f.read()
        
    required_links = [
        "/", 
        "/projects/", 
        "/slides/", 
        "/contributions/"
    ]
    
    missing = []
    for link in required_links:
        if link not in content:
            missing.append(link)
            
    if missing:
        print(f"[FAIL] Navigation is missing links for: {', '.join(missing)}")
        return False
        
    print("[PASS] Navigation file exists and contains all required links.")
    return True

if __name__ == "__main__":
    if not verify_navigation():
        sys.exit(1)
    sys.exit(0)
