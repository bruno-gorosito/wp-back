

const express = require("express");
const connectDB = require("./config/db")
const bodyParser = require("body-parser");
//create the server
const app = express();

//Connect to db
connectDB();

//habilitate express.json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app port
const port = process.env.PORT || 4000;

app.use('/api/songs', require('./routes/songs'))
app.get('/', (req, res) => res.send('Hi'))

app.listen(port, '0.0.0.0', () => {
    console.log(`Funcionando en ${port}`)
})
