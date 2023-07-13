const { Mongoose } = require('mongoose');
const Song = require('../models/song')
const axios = require('axios');


exports.createSong = async(req, res) => {
    try {
        let aux;
        console.log(req.body)
        const song = new Song(req.body);
        const {name, author} = song;

        
        if (author) {
            aux = name.replace(" ", "%20") + "%20" + author.replace(" ", "%20");
        } else {
            aux = name.replace(" ", "%20")
        }

        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${aux}&key=${process.env.API_KEY_GOOGLE}`
        
        const headers = {
            Referer: process.env.URL_FRONT // Reemplaza esto con la URL de tu sitio web
          };
        const response = await axios.get(url, { headers });
        let result = response.data;
        song.idVideo = result.items[0].id.videoId;
        
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
        const song = await Song.findById(req.params.id);
        res.send(song);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}


// exports.updateSong = async(req, res) = >{

// }