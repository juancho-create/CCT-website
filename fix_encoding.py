import os

replacements = {
    'â­': '⭐',
    'Â·': '·',
    'ðŸ …': '🏅',
    'ðŸ“…': '📅',
    'â€”': '—',
    'Ã­': 'í',
    'Â©': '©',
    'ðŸ”¥': '🔥',
    'ðŸŒ®': '🌮',
    'ðŸ¥‘': '🥑',
    'â˜•': '☕',
    'ðŸŒ¿': '🌿',
    'ðŸ «': '🍫',
    'ðŸ’ƒ': '💃',
    'â›°ï¸ ': '⛰️',
    'ðŸ ¦': '🐦',
    'ðŸŒŠ': '🌊',
    'ðŸ ‹': '🐋',
    'Ã ' : 'à'
}

def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        new_content = content
        for old, new in replacements.items():
            new_content = new_content.replace(old, new)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed: {filepath}")
        else:
            print(f"No changes: {filepath}")
    except Exception as e:
        print(f"Error fixing {filepath}: {e}")

html_files = [f for f in os.listdir('.') if f.endswith('.html')]
for html_file in html_files:
    fix_file(html_file)
