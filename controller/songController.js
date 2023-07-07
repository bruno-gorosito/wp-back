const Song = require('../models/song')

exports.createSong = async(req, res) => {
    try {
        let song;
        song = new Song(req.body);
        console.log(song)
        await song.save();
        res.send('dksladkhjas');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}