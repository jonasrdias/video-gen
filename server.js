const express = require('express');
const path = require('path');
const videoRoutes = require('./src/routes/videoRoutes');

const app = express();
app.use(express.json());

app.use('/api', videoRoutes);

// Servir arquivos estáticos da pasta 'output'
app.use('/output', express.static(path.join(__dirname, 'output')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
