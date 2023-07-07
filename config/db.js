
const mongoose = require("mongoose");
require("dotenv").config({path: '.env'})


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
        console.log('db connected')
    } catch (error) {
        console.log(error);
        process.exit(1); //Stop the app
    }
}

module.exports = connectDB;