const express = require("express");
const {SignUpModel} = require("./db.cjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();


const route = new express.Router();


route.use(express.json());
route.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));
route.post("/",async (req,res)=>{
    let DataSent = false;
  
    try{
        await SignUpModel.create({
            username:req.body.username,
            email:req.body.email,
            password: await bcrypt.hash(req.body.password,5),
            name:req.body.name,
            Age:req.body.Age
        })
        res.status(200).json({
            messgae:"Entry Created",
            value:true
        })
    }catch(error){
        res.status(400).json({
            messgae:"An Error Occured",
            value:false,
            error:error
        })
    }
    
    

    
})


route.get("/",(req,res)=>{
    res.status(400).json({
        messgae:"Wrong Request"
    })
})


module.exports = {
    route
}