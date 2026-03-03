import os
from bs4 import BeautifulSoup
import re

html_files = [
    'street-food.html', 'market-tour.html', 'coffee-tasting.html',
    'coffee-farm.html', 'chocotour.html', 'salsa-tour.html',
    'cristo-rey.html', 'hummingbirds.html', 'waterfalls.html',
    'whale-watching.html'
]

def fix_image_src(card):
    # Extract the tour name from the href
    link = card.find('a', href=True)
    if link:
        href = link.get('href', '')
        # E.g. market-tour.html
        m = re.match(r'([a-z0-9-]+)\.html', href)
        if m:
            tour_name = m.group(1)
            img = card.find('img')
            if img:
                img['src'] = f"images/tours/{tour_name}-thumb.jpg"

for file in html_files:
    if not os.path.exists(file):
        print(f"File not found: {file}")
        continue
    
    with open(file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # 1. Layout Fix
    main_content = soup.find('div', class_=re.compile(r'tour-main-content'))
    aside = soup.find('aside', class_=re.compile(r'tour-sidebar'))
    
    # The sections are usually inside a container that is after the tour-details-grid container
    # Let's find the sections "You Might Also Like" and "What Travelers Say"
    like_section = soup.find('h2', string=re.compile(r'You Might Also Like', re.I))
    reviews_section = soup.find('h2', string=re.compile(r'What Travelers Say|Traveler Reviews', re.I))
    
    sections_to_move = []
    if like_section:
        parent_section = like_section.find_parent('section')
        if parent_section:
            sections_to_move.append(parent_section)
    
    if reviews_section:
        parent_section = reviews_section.find_parent('section')
        if parent_section:
            sections_to_move.append(parent_section)
            
    if main_content and sections_to_move:
        for section in sections_to_move:
            # Check if it's already in main_content
            if section.find_parent('div', class_=re.compile(r'tour-main-content')):
                continue
                
            # Extract section and append to main_content
            extracted = section.extract()
            main_content.append(extracted)
            
    # Remove empty containers
    for container in soup.find_all('div', class_=re.compile(r'container mb-60 mt-40 reveal|container mb-60')):
        # if it consists only of whitespace or comments, remove it
        if not container.find(lambda t: t.name != 'br' and t.name != 'div' and not (isinstance(t, str) and not t.strip())):
            pass # Actually bs4 empty checking can be easier
        if len(container.find_all(True)) == 0 and not container.text.strip():
            container.decompose()

    # 2. Fix images in "You Might Also Like" cards
    cards = soup.find_all('div', class_='tour-card')
    for card in cards:
        fix_image_src(card)
        
    with open(file, 'w', encoding='utf-8', newline='') as f:
        # Avoid bs4 auto formatting breaking things, just convert to str
        f.write(str(soup))
        
print("Done modifying HTML files.")
