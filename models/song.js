const mongoose = require('mongoose');


const SongSchema = mongoose.Schema({
   name: {
       type: String,
       required: true,
       trim: true
   },
   author: {
       type: String,
       default: "",
       trim: true
   },
   lyric: {
       type: String,
       default:'No Lyric Available', 
       trim: true
   },
   tone: {
       type: String,
       default: 'Not defined'
   },
   intensity: {
       type: String,
       default: 'Not defined'
   }
});


module.exports = mongoose.model( 'Song', SongSchema);