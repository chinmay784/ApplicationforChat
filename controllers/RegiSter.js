const bcrypt = require("bcrypt")
const User = require("../models/Register");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
require("dotenv"),config()

exports.register = async(req,res) =>{
    try {
        let {userName,password,email} = req.body;

        if(!userName || !password || !email){
            return res.json({
                success:false,
                message:"All fildes are Required",
            })
        }

        const checkUser = await User.findOne({userName});
        if(checkUser){
            return res.json({
                success:true,
                message:"userName Already Exist"
            })
        }

        const checkEmail = await User.findOne({email});
        if(checkEmail){
            return res.json({
                success:true,
                message:"userName Already Exist"
            })
        }


        const hashPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            userName,
            email,
            password:hashPassword,
        })
        console.log(user)
        delete user.password;

        return res.status(200).json({
            success:true,
            message:" user created successfully",
            user
        })
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:error.message, 
        })
      
    }
}


exports.login = async (req,res) =>{
    try {
        const {email , password} = req.body;

        if(!email || !password){
            return res.json({
                success:false,
                message:"Please provied username and password",
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.json({
                success:false,
                message:"You are not Registred ",
            })
        }

        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign(
                {
                    email:user.email,
                    id:user._id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"24h"
                }
            );

            user.token = token;
            user.password = undefined;
            const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
            res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}



exports.getAllUsers = async(req,res) =>{
    try {
        const getAllUsers = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);

        return res.json({
            success:true,
            data:getAllUsers,
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}