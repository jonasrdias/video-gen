const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs').promises;

async function createVideoFromFrames(framePaths, outputPath) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(path.join(path.dirname(framePaths[0]), 'frame_%04d.png'))
      .inputFPS(30)
      .outputOptions('-c:v libx264')
      .outputOptions('-pix_fmt yuv420p')
      .output(outputPath)
      .on('end', () => {
        console.log('Vídeo criado com sucesso:', outputPath);
        resolve(outputPath);
      })
      .on('error', (err) => {
        console.error('Erro ao criar vídeo:', err);
        reject(err);
      })
      .run();
  });
}

module.exports = { createVideoFromFrames };