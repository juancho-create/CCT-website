const fs = require('fs');

// 1. Fix components.css
let comp = fs.readFileSync('c:/Users/crxre/Downloads/CapturasCCT/CCT-website/src/css/components.css', 'utf8');
comp = comp.replace(/transition-delay:\s*0\.[3-9]s/g, 'transition-delay: 150ms');
comp = comp.replace(/transition-delay:\s*[2-9][0-9]{2}ms/g, 'transition-delay: 150ms');
fs.writeFileSync('c:/Users/crxre/Downloads/CapturasCCT/CCT-website/src/css/components.css', comp);

// 2. Fix performance-optimizer.js
let perf = fs.readFileSync('c:/Users/crxre/Downloads/CapturasCCT/CCT-website/src/js/performance-optimizer.js', 'utf8');
perf = perf.replace(/rootMargin:\s*['"]50px 0px['"]/g, "rootMargin: '0px 0px -30px 0px'");
fs.writeFileSync('c:/Users/crxre/Downloads/CapturasCCT/CCT-website/src/js/performance-optimizer.js', perf);

// 3. Fix modern-animations.js
let anim = fs.readFileSync('c:/Users/crxre/Downloads/CapturasCCT/CCT-website/src/js/modern-animations.js', 'utf8');

const heroLogic = `
    // Force Hero animations immediately
    document.querySelectorAll('.hero [data-animate], .hero .animate-hidden, .hero .reveal, .hero .reveal-item, .tours-hero .reveal, .tours-hero .reveal-item').forEach((el, i) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.visibility = 'visible';
            el.classList.add('animate-visible');
            el.classList.add('active');
        }, i * 100);
    });
`;

anim = anim.replace('function initializeAnimations() {', 'function initializeAnimations() {' + heroLogic);

anim = anim.replace("const revealElements = document.querySelectorAll('.reveal, .reveal-item');",
    "const revealElements = document.querySelectorAll('.reveal, .reveal-item');\n    const filteredRevs = Array.from(revealElements).filter(el => !el.closest('.hero') && !el.closest('.tours-hero'));\n");

anim = anim.replace("revealElements.forEach(el => {", "filteredRevs.forEach(el => {");
anim = anim.replace(/start:\s*['"]top 85%['"]/g, "start: 'top 95%'");
fs.writeFileSync('c:/Users/crxre/Downloads/CapturasCCT/CCT-website/src/js/modern-animations.js', anim);

console.log('Issue 2 fixes applied.');
