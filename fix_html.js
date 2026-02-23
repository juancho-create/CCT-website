const fs = require('fs');
const path = require('path');

const dir = __dirname;

function fixHtmlFiles() {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (!file.endsWith('.html')) continue;
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Fix encoding artifacts
        content = content.replace(/Â·/g, '·');
        content = content.replace(/â€”/g, '—');
        content = content.replace(/Â©/g, '©');
        content = content.replace(/Â/g, ''); // Sometimes stray Â

        // Re-inject FontAwesome if missing
        if (!content.includes('font-awesome')) {
            content = content.replace('<!-- Font Awesome -->', '<!-- Font Awesome -->\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">');
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed ${file}`);
    }
}

fixHtmlFiles();
