const fs = require('fs');
const path = require('path');

const root = __dirname;
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    const filePath = path.join(root, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Completely remove image-optimizer.js
    content = content.replace(/<script type="module" src="js\/image-optimizer\.js"><\/script>\n?/g, '');

    // 2. Ensure performance-optimizer.js is present (if not, add it before </body>)
    if (!content.includes('performance-optimizer.js')) {
        content = content.replace('</body>', '  <script type="module" src="js/performance-optimizer.js"></script>\n</body>');
    }

    // 3. Ensure forms.js is present (if not, add it before </body> for the modal to work)
    if (!content.includes('forms.js')) {
        content = content.replace('</body>', '  <script type="module" src="js/forms.js"></script>\n</body>');
    }

    fs.writeFileSync(filePath, content);
    console.log(`Updated scripts in ${file}`);
});
console.log("Cleanup complete!");
