const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/crxre/Downloads/CapturasCCT/CCT-website';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(f => {
    const code = fs.readFileSync(path.join(dir, f), 'utf8');
    const headMatch = code.match(/<head>([\s\S]*?)<\/head>/i);
    if (!headMatch) {
        return;
    }
    const head = headMatch[1];

    const tags = head.match(/<[^>]+>/g) || [];
    const isCharsetFirst = tags.length > 0 && tags[0].includes('charset');
    const hasViewport = head.includes('name="viewport" content="width=device-width, initial-scale=1.0"');

    let firstScriptIdx = tags.findIndex(t => t.startsWith('<script'));
    let lastCssIdx = -1;
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].includes('rel="stylesheet"')) lastCssIdx = i;
    }

    const cssBeforeScript = firstScriptIdx === -1 || lastCssIdx === -1 || lastCssIdx < firstScriptIdx;

    if (!isCharsetFirst || !hasViewport || !cssBeforeScript) {
        console.log(f + ': charsetFirst=' + isCharsetFirst + ', viewportOK=' + hasViewport + ', cssBeforeScript=' + cssBeforeScript);
    }

    // also check encoding issues like missing characters
    if (code.includes('')) {
        console.log(f + ': HAS CORRUPTED ENCODING ()');
    }
});
