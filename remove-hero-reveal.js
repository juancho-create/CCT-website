const fs = require('fs');
const path = require('path');

const root = __dirname;
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    const filePath = path.join(root, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace <div class="tour-hero ... reveal"> with <div class="tour-hero ...">
    if (content.match(/class="tour-hero ([^"]*)reveal"/)) {
        content = content.replace(/class="tour-hero ([^"]*)reveal"/g, 'class="tour-hero $1"');
        content = content.replace(/class="tour-hero "/g, 'class="tour-hero"'); // cleanup trailing space
        fs.writeFileSync(filePath, content);
        console.log(`Cleaned reveal class from hero in ${file}`);
    }
});
console.log("Cleanup complete!");
