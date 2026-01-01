import os
import sys

def verify_css():
    css_path = "assets/css/style.scss"
    
    if not os.path.exists(css_path):
        print(f"[FAIL] CSS file {css_path} does not exist.")
        return False
        
    with open(css_path, 'r') as f:
        content = f.read()
        
    if "nav" not in content:
        print("[FAIL] CSS does not contain navigation styles.")
        return False
        
    print("[PASS] CSS file exists and contains navigation styles.")
    return True

if __name__ == "__main__":
    if not verify_css():
        sys.exit(1)
    sys.exit(0)
