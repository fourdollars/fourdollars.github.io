import os
import sys

def verify_pages():
    required_pages = [
        "projects.md",
        "slides.md",
        "contributions.md"
    ]
    
    missing = []
    invalid = []
    
    for page in required_pages:
        if not os.path.exists(page):
            missing.append(page)
        else:
            with open(page, 'r') as f:
                content = f.read()
                if "layout: default" not in content and "layout: page" not in content:
                    invalid.append(page)
    
    if missing:
        print(f"[FAIL] Missing pages: {', '.join(missing)}")
        return False
        
    if invalid:
        print(f"[FAIL] Pages missing correct layout front matter: {', '.join(invalid)}")
        return False
        
    print("[PASS] All required pages exist with correct front matter.")
    return True

if __name__ == "__main__":
    if not verify_pages():
        sys.exit(1)
    sys.exit(0)
