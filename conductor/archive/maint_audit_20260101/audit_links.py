import re
import urllib.request
import urllib.error
import sys

def get_links(filename):
    with open(filename, 'r') as f:
        content = f.read()
    # Regex to find markdown links [text](url)
    links = re.findall(r'\[.*?\]\((.*?)\)', content)
    return links

def check_link(url):
    # Ignore internal links (starting with /)
    if url.startswith('/'):
        return True, "Internal Link (Skipped)"
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'})
        with urllib.request.urlopen(req, timeout=5) as response:
            if response.status == 200:
                return True, "OK"
            else:
                return False, f"Status Code: {response.status}"
    except urllib.error.HTTPError as e:
        return False, f"HTTP Error: {e.code}"
    except urllib.error.URLError as e:
        return False, f"URL Error: {e.reason}"
    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    filename = "README.md"
    links = get_links(filename)
    failed = False
    
    print(f"Auditing links in {filename}...")
    for url in links:
        success, message = check_link(url)
        if not success:
            print(f"[FAIL] {url}: {message}")
            failed = True
        else:
            print(f"[OK] {url}")
            
    if failed:
        sys.exit(1)
    else:
        print("All links passed.")
        sys.exit(0)

if __name__ == "__main__":
    main()
