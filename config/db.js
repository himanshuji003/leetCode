const mongoose = require('mongoose')

const main = async () =>{
    try{
        await mongoose.connect(process.env.DB_CONNECT_STRING);
        // console.log("Database connected successfully");
    }
    catch(err){
        console.error("Database connection failed! "+err);
        process.exit(0);
    }
}
module.exports = main;