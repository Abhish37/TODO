const express = require("express");
const {SignUpModel} = require("./db.cjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const {verifyUserExistMiddle} = require("./verifyUserExistMiddle.cjs");
const cors = require("cors");
dotenv.config();
const cookieParser = require('cookie-parser');

const route = new express.Router();


route.use(express.json());
route.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));
route.use(cookieParser());


route.post("/",async (req,res)=>{
    console.log("req");
    const user = await SignUpModel.findOne({
        username:req.body.username
    })

    if(user){
        try{
            bcrypt.compare(req.body.password,user.password);
            const token = await jwt.sign(user._id.toString(),process.env.JWT_SECRET_BACKEND);
            // console.log(token);
            res.cookie("token",token);
            // console.log("res=>"+ true);
            res.status(200).json({
                message:"Verified",
                value:true,
                username:true
            })
            
        }catch(err){
            console.error(err);
            res.status(400).json({
                message:"Invalid Password",
                value:false,
                username:true
            })
        }
    }
    else{
        res.status(400).json({
            message:"Username Doesnot Exist",
            username:false
        })
    }
})


route.post("/FindUser",async (req,res)=>{
    const user = await SignUpModel.findOne({
        username:req.body.username
    })
    if(user){
        res.json({
            username:true
        })
    }
    else{
        res.json({
            username:false
        })
    }
}
)

route.post("/FindEmail",async (req,res)=>{
    const user = await SignUpModel.findOne({
        email:req.body.email
    })
    if(user){
        res.json({
            email:true,
            found:true,
            value:false
        })
    }
    else{
        res.json({
            email:false,
            found:false,
            value:true
        })
    }
}
)

route.get("/GetUser",verifyUserExistMiddle,async (req,res)=>{
    let user = await SignUpModel.findOne({
        _id:req.body._id
    })
    if(user){
        res.json({
            message:"Done",
            username:user.username,
            name:user.name,
            value:true
        })
    }
    else{
        res.json({
            value:false
        })
    }


    
})

module.exports = {
    route
}