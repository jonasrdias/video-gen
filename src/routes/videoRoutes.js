const express = require('express');
const router = express.Router();
const { createVideoFromImages } = require('../controllers/videoController');

router.post('/create-video', createVideoFromImages);

module.exports = router;
