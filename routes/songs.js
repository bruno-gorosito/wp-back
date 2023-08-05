const express = require('express');
const songController = require('../controller/songController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();


//create a song
// api/songs
router.post('/',
    auth,
    upload.single("file"),
    songController.createSong
)

router.get('/', 
    songController.getSongs
)

router.get('/download/:id', 
    songController.downloadChords
)

router.get('/:id',
    songController.getSong
)

router.put('/edit/:id', 
    auth,
    songController.updateSong
)

module.exports = router;