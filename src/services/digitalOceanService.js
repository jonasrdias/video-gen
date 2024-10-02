const AWS = require('aws-sdk');
const fs = require('fs');

const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET
});

async function uploadToDigitalOcean(filePath, fileName) {
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: '148ae0f3',
    Key: fileName,
    Body: fileContent,
    ACL: 'public-read',
    ContentType: 'video/mp4'  // Ajuste conforme necessário
  };

  try {
    const data = await s3.upload(params).promise();
    // Substituir a URL do Space pela URL do CDN
    const cdnUrl = data.Location.replace(
      'https://148ae0f3.nyc3.digitaloceanspaces.com',
      'https://cdn.wirefy.com.br'
    );
    console.log(`Arquivo enviado com sucesso. ${cdnUrl}`);
    return cdnUrl;
  } catch (err) {
    console.error("Erro ao fazer upload:", err);
    throw err;
  }
}

module.exports = { uploadToDigitalOcean };
