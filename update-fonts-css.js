const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'css');

['base.css', 'components.css', 'pages.css'].forEach(file => {
    const filePath = path.join(cssDir, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Upgrade Playfair to Barlow Condensed globally
    content = content.replace(/'Playfair Display', (Georgia, )?serif/g, "'Barlow Condensed', sans-serif");
    content = content.replace(/'Playfair Display', serif/g, "'Barlow Condensed', sans-serif");

    // 2. Enforce Hero hierarchy (Error 4)
    if (file === 'pages.css') {
        const heroRegex = /\.hero-content h1 \{[\s\S]*?\}/g;
        content = content.replace(heroRegex, `.hero-content h1 {
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  margin-bottom: var(--space-6);
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  line-height: 1.1;
  letter-spacing: -0.02em;
}`);

        // Add structural gap to tours grid
        const toursGridRegex = /\.tours-grid \{[\s\S]*?\}/g;
        content = content.replace(toursGridRegex, `.tours-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}`);

        // Add Section Separator SVG
        if (!content.includes('clip-path')) {
            content += `
/* ============================================
   SECTION SEPARATORS (Error 4 Overrides)
   ============================================ */
.features {
  clip-path: polygon(0 0, 100% 0, 100% 98%, 0 100%);
  padding-bottom: calc(var(--space-24) + 2%);
}
.tours {
  clip-path: polygon(0 2%, 100% 0, 100% 100%, 0 100%);
  margin-top: -2%;
  padding-top: calc(var(--space-20) + 2%);
}
`;
        }
    }

    fs.writeFileSync(filePath, content);
    console.log(`Updated typography and layout in ${file}`);
});
