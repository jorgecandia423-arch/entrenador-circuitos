const fs = require('fs');
const JSZip = require('jszip');

async function main() {
  const data = fs.readFileSync('3.1 LEY DE OHM,.docx');
  const zip = await JSZip.loadAsync(data);
  const xml = await zip.file('word/document.xml').async('string');
  
  // Extract all text content between <w:t> tags
  const regex = /<w:t[^>]*>([^<]*)<\/w:t>/g;
  let match;
  let allText = [];
  let currentPara = '';
  
  // Split by paragraphs first
  const paragraphs = xml.split(/<\/w:p>/);
  
  for (const para of paragraphs) {
    const texts = [];
    const tRegex = /<w:t[^>]*>([^<]*)<\/w:t>/g;
    let m;
    while ((m = tRegex.exec(para)) !== null) {
      texts.push(m[1]);
    }
    if (texts.length > 0) {
      allText.push(texts.join(''));
    }
  }
  
  console.log(allText.join('\n'));
}

main().catch(console.error);
