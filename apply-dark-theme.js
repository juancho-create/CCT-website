const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'css');

// We are targeting the primary structure files
const baseCss = path.join(cssDir, 'base.css');
const pagesCss = path.join(cssDir, 'pages.css');

// Update base.css
let baseContent = fs.readFileSync(baseCss, 'utf8');

// The user requested that we NEVER use background: white or #FFFFFF in sections
// And we should inject the dark aesthetic.
baseContent = baseContent.replace(/background-color: var\(--white\);/g, 'background-color: var(--fondo-oscuro); color: var(--texto-claro);');
baseContent = baseContent.replace(/background-color: var\(--gray-light\);/g, 'background-color: var(--fondo-oscuro); color: var(--texto-claro);');
baseContent = baseContent.replace(/background: var\(--gray-light\);/g, 'background: var(--fondo-oscuro); color: var(--texto-claro);');
baseContent = baseContent.replace(/color: var\(--dark\);/g, 'color: var(--texto-claro);');
baseContent = baseContent.replace(/color: var\(--gray\);/g, 'color: var(--texto-secundario);');

// Apply the system:
const overrides = `
/* ============================================
   PREMIUM DARK SCALING (Error 3 overrides)
   ============================================ */
section {
  background-color: var(--fondo-oscuro) !important;
  color: var(--texto-claro) !important;
}

body {
    background-color: var(--fondo-negro);
    color: var(--texto-claro);
}

.light-section, .bg-light {
    background-color: var(--fondo-oscuro) !important;
}
`;

if (!baseContent.includes('PREMIUM DARK SCALING')) {
    baseContent += overrides;
}

fs.writeFileSync(baseCss, baseContent);


// Update pages.css
let pagesContent = fs.readFileSync(pagesCss, 'utf8');

// Modify specific background variables according to Error 3 requirements
// Hero overlays should use the pink/dark gradient
pagesContent = pagesContent.replace(/linear-gradient\(to right, rgba\(15, 23, 42, 0.9\), rgba\(15, 23, 42, 0.4\)\)/g, 'linear-gradient(160deg, rgba(255, 0, 127, 0.75) 0%, rgba(10, 5, 5, 0.85) 100%)');
pagesContent = pagesContent.replace(/linear-gradient\(rgba\(0, 0, 0, 0.4\), rgba\(0, 0, 0, 0.7\)\)/g, 'linear-gradient(160deg, rgba(255, 0, 127, 0.75) 0%, rgba(10, 5, 5, 0.85) 100%)');

// Tours grid using #0D0508
pagesContent = pagesContent.replace(/\.tours \{[\s\S]*?\}/, '.tours {\n  background-color: var(--fondo-oscuro);\n}');

// About Section using diagonal pink gradient
pagesContent = pagesContent.replace(/\.about \{[\s\S]*?\}/, '.about {\n  padding: var(--space-20) 0;\n  background: linear-gradient(135deg, var(--pink) 0%, #8B0040 100%);\n  color: #FFFFFF;\n}');

// Contact/Footer using #050205 deep black
pagesContent = pagesContent.replace(/\.footer \{[\s\S]*?\}/, '.footer {\n  background-color: var(--fondo-negro);\n  border-top: 3px solid var(--pink);\n  padding: var(--space-16) 0 var(--space-8);\n  color: var(--white);\n}');

fs.writeFileSync(pagesCss, pagesContent);

console.log('Background CSS variables generated and modified successfully!');
