const { createCanvas, loadImage } = require('canvas');
const fs = require('fs').promises;
const path = require('path');

async function createFrames(imageUrls, outputDir) {
  const canvas = createCanvas(1280, 720);
  const ctx = canvas.getContext('2d');
  const framePaths = [];

  for (let i = 0; i < imageUrls.length; i++) {
    const image = await loadImage(imageUrls[i]);
    ctx.drawImage(image, 0, 0, 1280, 720);
    
    const framePath = path.join(outputDir, `frame_${i.toString().padStart(4, '0')}.png`);
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile(framePath, buffer);
    framePaths.push(framePath);
  }

  return framePaths;
}

module.exports = { createFrames };
