const mongoose = require('mongoose');


const SongSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        default: "Sin definir",
        trim: true
    },
    lyric: {
        type: String,
        default:'Letra no disponible', 
        trim: true
    },
    tone: {
        type: String,
        default: 'Sin definir'
    },
    intensity: {
        type: String,
        default: 'Sin definir'
    },
    idVideo: {
        type: String
    }
});


module.exports = mongoose.model( 'Song', SongSchema);