const express = require('express');
const songController = require('../controller/songController');

const router = express.Router();


//create a song
// api/songs
router.post('/', (req, res) => {
    songController.createSong(req, res); 
})

router.get('/', (req, res) => {
    res.send('ola')
})

module.exports = router;