const express = require('express');
const songController = require('../controller/songController');

const router = express.Router();


//create a song
// api/songs
router.post('/', (req, res) => {
    songController.createSong(req, res); 
})

router.get('/', (req, res) => {
    songController.getSongs(req, res)
})

router.get('/:id', (req, res) => {
    songController.getSong(req, res)
})

module.exports = router;