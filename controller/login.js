const User=require('../models/user');
require("dotenv").config();
const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');
exports.login= async(req, res)=>{
    try {
        const {email, password}=req.body;

        if( !email || !password){

            return res.status(400).json({
                success:false,
                message:"all detail require bad request "
            })
        }

        // let find user if db

        const user=await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message: "Unauthorized request status with error message",
            });
        }

        // JWT Token Generation

        if( await bcrypt.compare(password, user.password)){
            const token=jwt.sign({email:user.email, id:user._id},

                process.env.JWT_SECRET,{
                    expiresIn:"24h",
                }
            );


            // save token to user document in database
            user.token=token;
            user.password=undefined;

            // setting cookies for token and reurn success respons

            const option={
                expires:new Date(Date.now()+ 3*24*60*1000),
                httpOnly:true,
            };

            res.cookie("token", token, option).status(200).json({
                success:true,
                token,
                user,
                message:`user login successfully`
            })
        } else{
            return res.status(401).json({
                success:false,
                message: "password is not correct",
            });
        }

    
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success:false,
            message:`failed to login`
        })
    }


}