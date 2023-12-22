const mongoose = require("mongoose")
require("dotenv").config()

exports.Connect = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then( () => console.log("DB Connection SuccessFully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
}