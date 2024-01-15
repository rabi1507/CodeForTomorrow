const express= require("express");
const app=express();
require('dotenv').config();
const database=require('./config/database');
const endpoint= require("./router/routs");

// to send data in req.body
app.use(express.json());

app.use("/api/v1", endpoint);

app.use("/", (req, res)=>{
    return res.status(200).send(`this is home page`)
})
const PORT=process.env.PORT;



database.dbConnection();
app.listen(PORT, ()=>{
    console.log(`app is listing at port ${PORT}`);
})


