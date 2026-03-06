import re
import os

def fix_html_content(filepath):
    try:
        with open(filepath, 'rb') as f:
            content = f.read().decode('utf-8', errors='ignore')

        # Fix the trust bar
        pattern = r'<div class="hero-trust-bar">.*?</div>'
        replacement = '<div class="hero-trust-bar"><span>⭐ 4.9 Rating</span><span class="separator">·</span><span>200+ Travelers</span><span class="separator">·</span><span>🏅 Licensed RNT 196165</span><span class="separator-dot">·</span><span>📅 Tours available daily</span></div>'
        
        new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        
        # Also fix the star rating in the About section if found
        new_content = new_content.replace('â˜…', '★')
        new_content = new_content.replace('Â·', '·')
        new_content = new_content.replace('ðŸ …', '🏅') # Byte fallback
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed content in {filepath}")
    except Exception as e:
        print(f"Error in {filepath}: {e}")

for f in os.listdir('.'):
    if f.endswith('.html'):
        fix_html_content(f)
