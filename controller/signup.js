const User=require('../models/user');
const bcrypt=require('bcrypt');

exports.signup= async(req, res)=>{
    try{
        const {name, email, password}=req.body;

        if( !name || !email || !password){
            return res.status(404).send({
                success:false,
                message:"all field require"
            })
        }
        // cheching if user all ready available 
        const existingUser= await User.findOne({email});
        console.log(existingUser);
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exist",
            });
        }
        const hashpassword=await bcrypt.hash(password, 10);
        console.log(hashpassword);

        const user=await User.create({
            name, email, password:hashpassword
        });

        return res.status(200).json({
            success:true,
            user,
            message:"User register fine",
        })
    }
    catch(err){

        res.status(500).json({
            success:false,
            message:"User can not resgister"
        })

    }
}


