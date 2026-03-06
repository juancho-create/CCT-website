from bs4 import BeautifulSoup
import os

new_trust_bar = '<span>⭐ 4.9 Rating</span><span class="separator">·</span><span>200+ Travelers</span><span class="separator">·</span><span>🏅 Licensed RNT 196165</span><span class="separator-dot">·</span><span>📅 Tours available daily</span>'

def fix_html_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            soup = BeautifulSoup(f, 'html.parser')
        
        target = soup.find(class_='hero-trust-bar')
        if target:
            target.contents = BeautifulSoup(new_trust_bar, 'html.parser').contents
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(str(soup))
            print(f"Fixed trust bar in {filepath}")
        
    except Exception as e:
        print(f"Error in {filepath}: {e}")

# Also fix the About section star in index.html
def fix_index_about():
    try:
        with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Manually fix common Corruptions if BeautifulSoup misses them or they are outside the target
        content = content.replace('â˜…', '★')
        content = content.replace('ðŸ …', '🏅')
        content = content.replace('â­ ', '⭐')
        content = content.replace('Â·', '·')
        
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed index.html manually")
    except Exception as e:
        print(f"Error index: {e}")

for f in os.listdir('.'):
    if f.endswith('.html'):
        fix_html_file(f)

fix_index_about()
