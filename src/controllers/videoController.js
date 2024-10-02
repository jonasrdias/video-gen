const { v4: uuidv4 } = require('uuid');
const { createFrames } = require('../services/frameService');
const { createVideoFromFrames } = require('../services/ffmpegService');
const path = require('path');
const fs = require('fs').promises;
const { uploadToDigitalOcean } = require('../services/digitalOceanService');

async function createVideoFromImages(req, res) {
  try {
    const { imageUrls } = req.body;
    const videoId = uuidv4();
    
    const tempDir = path.join(__dirname, '../../temp', videoId);
    await fs.mkdir(tempDir, { recursive: true });

    const framePaths = await createFrames(imageUrls, tempDir);

    const localVideoPath = path.join(tempDir, `${videoId}.mp4`);
    await createVideoFromFrames(framePaths, localVideoPath);

    // Upload para Digital Ocean Spaces
    const cdnUrl = await uploadToDigitalOcean(localVideoPath, `${videoId}.mp4`);

    // Limpar arquivos temporários
    await fs.rm(tempDir, { recursive: true, force: true });

    res.json({ videoUrl: cdnUrl });
  } catch (error) {
    console.error('Erro ao criar vídeo:', error);
    res.status(500).json({ error: 'Erro ao criar o vídeo' });
  }
}

module.exports = { createVideoFromImages };