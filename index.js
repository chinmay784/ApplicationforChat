const express = require("express");
const database =require("./config/dataBase")
require("dotenv").config();
const corse = require("cors")
const userRoute = require("./routes/UserRoute")
const cookiparser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(corse())
app.use(express.json())
app.use(cookiparser());

app.use("/api/v1/user",userRoute);

app.listen(PORT,() =>{
    console.log(`App is runnimg ${PORT}`);
})

database.Connect()

app.get("/", (req,res) =>{
    return res.json({
        success:true,
        message:"server is running",
    })
})
