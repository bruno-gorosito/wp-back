

const express = require("express");
const connectDB = require("./config/db")
const http = require('http');
const bodyParser = require("body-parser");
const cors = require('cors')
const { Server } = require("socket.io");


//create the server
const app = express();
app.use(cors())


//habilitate express.json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());






//app port
const port = process.env.PORT || 4000;

app.use('/api/songs', require('./routes/songs'))
app.get('/', (req, res) => res.send('Hi'))




const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.URL_FRONT,
        methods: ["GET", "POST",  "PUT"]
    }
});


//Connect to db
connectDB();
  
io.on("connection", (socket) => {
    socket.on('newSong', (data) => {
        socket.broadcast.emit('loadNewSong', data);
    })
});




server.listen(port, '0.0.0.0', () => {
    console.log(`Funcionando en ${port}`)
})
