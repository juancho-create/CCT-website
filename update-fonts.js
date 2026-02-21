const fs = require('fs');
const path = require('path');

const walkSync = function (dir, filelist) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!['node_modules', '.git', 'dist'].includes(file)) {
                filelist = walkSync(fullPath, filelist);
            }
        } else {
            if (file.endsWith('.html')) filelist.push(fullPath);
        }
    });
    return filelist;
};

const files = walkSync('./');
const newLink = `<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">`;
const catchAll = /<link href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]*" rel="stylesheet">/g;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content.replace(catchAll, newLink);
    if (content !== newContent) {
        fs.writeFileSync(file, newContent);
        console.log('Updated font (fallback) in ' + file);
    }
});
