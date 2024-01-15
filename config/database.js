const mongoose= require('mongoose');
require('dotenv').config();

exports.dbConnection=()=>{
    mongoose.connect(process.env.DataBase, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("db connected"))
    .catch((error)=>{
        console.log("issue found while connecting with db");
        console.error(error);
        process.exit(1);
    })

}

// module.exports=dbConnection;