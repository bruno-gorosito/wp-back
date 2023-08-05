const { Mongoose } = require('mongoose');
const Song = require('../models/song')
const axios = require('axios');
const { google } = require('googleapis');
const fs = require('fs');

exports.createSong = async(req, res) => {
    try {
        console.log(req.file)
        console.log(req.body.newSong)
        let aux;
        let newSong = JSON.parse(req.body.newSong);
        const song = new Song(newSong);
        const {name, author} = song;
    
        
        if (author) {
            aux = name.replace(" ", "%20") + "%20" + author.replace(" ", "%20");
        } else {
            aux = name.replace(" ", "%20")
        }

        
        song.chords = await uploadFile(req)
        
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${aux}&key=${process.env.API_KEY_GOOGLE}`
        
        const headers = {
            Referer: process.env.URL_FRONT // Reemplaza esto con la URL de tu sitio web
          };
        const response = await axios.get(url, { headers });
        let result = response.data;
        song.idVideo = result.items[0].id.videoId;
        
        await song.save();
        return res.send('Cancion añadida.').status(200);


    } catch (error) {
        console.log(error);
        return res.status(400).send('Hubo un error');
    }
}


exports.downloadChords = async(req, res) => {
    try {
        console.log(req.params)

        const auth = new google.auth.GoogleAuth({
            keyFile: './google-drive.json', 
            scopes: ['https://www.googleapis.com/auth/drive']
        })

        const driveService = google.drive({
            version: 'v3',
            auth
        })


        const fileData = await driveService.files.get({
            fileId: req.params.id,
            alt: 'media',
        }, { responseType: 'stream' });

        const metaData = await driveService.files.get({
            fileId: req.params.id
        });
        

        res.setHeader('Content-Disposition', `attachment; filename="${metaData.data.name}"`);
        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

        fileData.data.pipe(res);
        


    } catch (error) {
        console.log(error)
        return res.status(400).send('Hubo un error')
    }

}


exports.getSongs = async(req, res) => {
    try {
        const songs =  await Song.find({});
        return res.send(songs);
    } catch (error) {
        console.log(error);
        return res.status(400).send('Hubo un error');
    }
}

exports.getSong = async(req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        return res.status(200).send(song);
    } catch (error) {
        console.log(error);
        return res.status(400).send('Hubo un error');
    }
}


exports.updateSong = async(req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        console.log(req.body)
        let songUpdated = req.body
        if (song.name !== req.body.name) {
            if (songUpdated) {
                aux = songUpdated.name.replace(" ", "%20") + "%20" + songUpdated.author.replace(" ", "%20");
            } else {
                aux = songUpdated.name.replace(" ", "%20")
            }
            const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${aux}&key=${process.env.API_KEY_GOOGLE}`
            const headers = {
                Referer: process.env.URL_FRONT // Reemplaza esto con la URL de tu sitio web
              };
            const response = await axios.get(url, { headers });
            let result2 = response.data;
            songUpdated.idVideo = result2.items[0].id.videoId;
        }
        const result = await Song.findByIdAndUpdate(req.params.id, songUpdated);
        return res.status(200).send(songUpdated)
    } catch (error) {
        console.log(error);
        return res.status(400).send('Hubo un error');
    }
}


const uploadFile = async(req) => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: './google-drive.json', 
            scopes: ['https://www.googleapis.com/auth/drive']
         })
    
         const driveService = google.drive({
            version: 'v3',
            auth
         })
    
    
    
         const fileMetaData = {
            'name': req.file.originalname,
            'parents': [process.env.GOOGLE_API_FOLDER_ID] 
         }
    
         const media = {
            MimeType: 'application/pdf',
            body: fs.createReadStream(req.file.path)
         }
    
    
         const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            fields: "id"
         })
    
         
    
         fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error al eliminar el archivo:', err);
            } else {
                console.log('Archivo eliminado:', req.file.filename);
            }
        });
    
    
    
        return response.data.id;
    } catch (error) {
        console.log(error)
    }
}