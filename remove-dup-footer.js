const fs = require('fs');
const path = require('path');

const root = __dirname;
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    const filePath = path.join(root, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // The duplicated block left by inline-templates.js
    const brokenFooter = `</footer>

<div class="overlay" id="overlay"></div>
<div class="modal" id="thankYouModal">
  <div class="modal-icon">
    <i class="fas fa-check-circle"></i>
  </div>
  <h3>Message Sent!</h3>
  <p>Thanks for reaching out! Juan will get back to you as soon as possible.</p>
  <button class="btn btn-pink" onclick="closeModal()">Close</button>
</div>
</footer>`;

    // Only replace if it actually exists (which it should, on every page except index which we just fixed)
    if (content.includes(brokenFooter)) {
        content = content.replace(brokenFooter, '');
        fs.writeFileSync(filePath, content);
        console.log(`Cleaned duplicate footer from ${file}`);
    }
});
console.log("Cleanup complete!");
