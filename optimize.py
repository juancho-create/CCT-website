import os
from bs4 import BeautifulSoup
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    
    # 1. Non render-blocking FontAwesome
    fa_links = soup.find_all('link', href=re.compile(r'font-awesome.*all\.min\.css'))
    for link in fa_links:
        if not link.get('media') or link.get('media') != 'print':
            link['media'] = 'print'
            link['onload'] = "this.media='all'"
            # Add noscript fallback if not exists
            if not link.find_next_sibling('noscript'):
                noscript = soup.new_tag('noscript')
                fallback = soup.new_tag('link', rel='stylesheet', href=link['href'])
                noscript.append(fallback)
                link.insert_after(noscript)

    # 2. Add aria-labels to buttons and icon-only links
    hamburger = soup.find(id='hamburger')
    if hamburger and not hamburger.get('aria-label'):
        hamburger['aria-label'] = 'Open Menu'
        
    close_menu = soup.find(id='closeMenu')
    if close_menu and not close_menu.get('aria-label'):
        close_menu['aria-label'] = 'Close Menu'
        
    for a in soup.find_all('a'):
        # If it only contains an icon and no text, add aria-label
        if not a.text.strip():
            icon = a.find('i')
            if icon:
                icon_class = ' '.join(icon.get('class', [])).lower()
                if 'instagram' in icon_class and not a.get('aria-label'):
                    a['aria-label'] = 'Instagram'
                elif 'whatsapp' in icon_class and not a.get('aria-label'):
                    a['aria-label'] = 'WhatsApp'
                elif 'envelope' in icon_class and not a.get('aria-label'):
                    a['aria-label'] = 'Email'

    # 3. Logo optimizations
    logos = soup.find_all('img', src=re.compile(r'images/logo\.jpg'))
    for logo in logos:
        if logo.get('loading') == 'lazy':
            del logo['loading']
        logo['fetchpriority'] = 'high'
        # Set discrete size to avoid CLS on the logo
        if not logo.get('width'):
            logo['width'] = '40'
        if not logo.get('height'):
            logo['height'] = '40'
        
    # 4. Hero image preload fetchpriority
    preload = soup.find('link', rel='preload', href=re.compile(r'home-hero\.jpg'))
    if preload:
        preload['fetchpriority'] = 'high'
        
    # 5. Fix forms accessibility (id and for)
    forms = soup.find_all('form')
    for form in forms:
        labels = form.find_all('label')
        for i, label in enumerate(labels):
            # Find the next input/textarea
            input_tag = label.find_next(['input', 'textarea'])
            if input_tag and input_tag.get('name'):
                name = input_tag.get('name')
                input_id = f'{name}_{i}'
                if not input_tag.get('id'):
                    input_tag['id'] = input_id
                label['for'] = input_tag['id']
                
    # 6. Add theme-color meta tag if not present
    if not soup.find('meta', attrs={'name': 'theme-color'}):
        head = soup.find('head')
        if head:
            meta = soup.new_tag('meta', attrs={'name': 'theme-color', 'content': '#E91E8C'})
            head.append(meta)

    # 7. Add lang attribute to html if missing
    html_tag = soup.find('html')
    if html_tag and not html_tag.get('lang'):
        html_tag['lang'] = 'en'
            
    # 8. Contrast issue on hero subtitle
    # Usually: <p style="... opacity: 0.6; ...">
    hero_p = soup.find('p', style=re.compile(r'opacity:\s*0\.6'))
    if hero_p:
        hero_p['style'] = hero_p['style'].replace('opacity: 0.6', 'opacity: 0.9')
            
    with open(file, 'w', encoding='utf-8', newline='') as f:
        f.write(str(soup))

print('Optimized all HTML files for performance and accessibility.')
