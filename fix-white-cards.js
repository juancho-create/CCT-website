const fs = require('fs');
const path = require('path');

const componentsCssPath = path.join(__dirname, 'css', 'components.css');
const pagesCssPath = path.join(__dirname, 'css', 'pages.css');

// 1. Fix the Navbar Scroll Background Override
let componentsContent = fs.readFileSync(componentsCssPath, 'utf8');

// The original CSS was: background-color: rgba(20, 5, 10, 0.92);
// I am adding !important to it so it overrides the inline or initial solid pink state.
componentsContent = componentsContent.replace(
    /background-color: rgba\(20, 5, 10, 0\.92\);/g,
    'background-color: rgba(20, 5, 10, 0.92) !important;'
);

// 2. Fix the White Tour Cards & Quick Nav Cards
componentsContent = componentsContent.replace(
    /\.tour-card \{\s+background: var\(--white\);/g,
    '.tour-card {\n  background: rgba(255, 255, 255, 0.03);'
);

componentsContent = componentsContent.replace(
    /background: var\(--white\);[\s\S]*?padding: 2\.5rem 1\.5rem;[\s\S]*?border-radius: var\(--radius-xl\);/g,
    'background: rgba(255, 255, 255, 0.03);\n  padding: 2.5rem 1.5rem;\n  border-radius: var(--radius-xl);'
);

// Quick Nav Card (just overriding the class text manually for safety)
componentsContent += `\n
/* ============================================
   PREMIUM DARK SCALING (Cards)
   ============================================ */
.tour-card, .quick-nav-card, .blog-category-card, .activity-card, .info-card {
    background: rgba(255, 255, 255, 0.03) !important;
    border: 1px solid rgba(255, 0, 127, 0.2) !important;
}

.tour-card h4, .quick-nav-card h3, .blog-category-card h3, .activity-card h3, .info-card h3 {
    color: var(--white) !important;
}

.tour-card p, .info-card p, .blog-category-card p {
    color: rgba(255, 255, 255, 0.7) !important;
}
`;

fs.writeFileSync(componentsCssPath, componentsContent);

// 3. Fix the White Contact Form & Info Cards on the Homepage
let pagesContent = fs.readFileSync(pagesCssPath, 'utf8');

// The contact section has a gradient background that's blinding white -> pink.
pagesContent = pagesContent.replace(
    /background: linear-gradient\(180deg, var\(--white\) 0%, var\(--pink-blush\) 100%\);/g,
    'background-color: var(--fondo-oscuro);'
);

// We'll append universal overrides for the contact cards
pagesContent += `\n
/* ============================================
   PREMIUM DARK SCALING (Contact Form)
   ============================================ */
.contact-form-wrapper, .contact-info-card {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 0, 127, 0.3) !important;
}

.contact-form-wrapper h3, .contact-info-card h4 {
    color: var(--white) !important;
}

.contact-form-wrapper p, .contact-info-card p, .contact-info-card a {
    color: rgba(255, 255, 255, 0.8) !important;
}

.contact-form-wrapper form label {
    color: var(--white) !important;
}

.contact-form-wrapper form input, .contact-form-wrapper form textarea {
    background: rgba(0, 0, 0, 0.2) !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
    color: var(--white) !important;
}
`;

fs.writeFileSync(pagesCssPath, pagesContent);

console.log('Successfully injected premium dark styling for all overlapping white cards and enforced navbar specificity!');
