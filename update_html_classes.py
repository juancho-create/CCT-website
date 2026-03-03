import os

html_files = [
    'street-food.html', 'market-tour.html', 'coffee-tasting.html',
    'coffee-farm.html', 'chocotour.html', 'salsa-tour.html',
    'cristo-rey.html', 'hummingbirds.html', 'waterfalls.html',
    'whale-watching.html'
]

for file in html_files:
    if not os.path.exists(file):
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Apply the string replacements
    # 1. replace the previous wrapper classes with `tour-layout`
    content = content.replace('class="tour-page-container container"', 'class="tour-page-container container d-none-if-needed"')
    # Wait, the simplest way is to replace .tour-details-grid with .tour-layout
    content = content.replace('class="tour-details-grid"', 'class="tour-layout"')
    content = content.replace('tour-main-content', 'tour-main')
    content = content.replace('style="position: sticky; top: 100px;"', '')
    
    with open(file, 'w', encoding='utf-8', newline='') as f:
        f.write(content)

print('Updated HTML classes successfully.')
