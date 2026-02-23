const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const mainScriptTag = '<script type="module" src="/main.js"></script>';

for (const file of htmlFiles) {
    if (file === 'index.html' || file === 'tours.html') {
        let content = fs.readFileSync(path.join(dir, file), 'utf8');
        let write = false;
        // Fix encoding characters just in case
        if (content.includes('CaleÃ±o')) { content = content.replace(/CaleÃ±o/g, 'Caleño'); write = true; }
        if (content.includes('dÃ­as')) { content = content.replace(/dÃ­as/g, 'días'); write = true; }
        if (content.includes('PÃ©rez')) { content = content.replace(/PÃ©rez/g, 'Pérez'); write = true; }
        if (write) fs.writeFileSync(path.join(dir, file), content, 'utf8');
        continue; // Already fixed structure for these
    }

    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove any old style links just in case
    content = content.replace(/<link\s+rel="stylesheet"\s+href="css\/[^>]+>\s*/g, '');

    // 2. Add main.js to <head> if missing
    if (!content.includes(mainScriptTag)) {
        content = content.replace('</head>', `  ${mainScriptTag}\n</head>`);
    }

    // 3. Fix missing <body> tag
    if (!content.includes('<body') && content.includes('</head>')) {
        content = content.replace('</head>\n', '</head>\n\n<body>\n');
        content = content.replace('</head>\r\n', '</head>\r\n\r\n<body>\r\n');
    }

    // Fix encoding characters
    content = content.replace(/CaleÃ±o/g, 'Caleño');
    content = content.replace(/dÃ­as/g, 'días');
    content = content.replace(/PÃ©rez/g, 'Pérez');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed structure for ${file}`);
}
