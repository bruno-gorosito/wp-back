const { Mongoose } = require('mongoose');
const Song = require('../models/song')

exports.createSong = async(req, res) => {
    try {
        let song;
        song = new Song(req.body);
        console.log(song)
        await song.save();
        res.send('Cancion añadida.').status(200);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}


exports.getSongs = async(req, res) => {
    try {
        const songs =  await Song.find({});
        res.send(songs);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.getSong = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}