const express = require("express");
const {SignUpModel} = require("./db.cjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyUserExistMiddle(req,res,next){
    try{
        // console.log(req.cookies);
        // console.log(req.cookies.token);
        jwt.verify(req.cookies.token,process.env.JWT_SECRET_BACKEND);
        // console.log("req reached");
        req.body._id = jwt.decode(req.cookies.token);
        next();
    }catch(err){
        console.error(err);
        res.status(400).json({
            message:"Invlid Signature",
            value:false
        })
    }
}

async function userExists(req,res,next){
    let user = await SignUpModel.findById(req.body._id);

    if(user){
        req.body.user = user;
        next();
    }
    else{
        res.json({
            message:"User Does Not Exists",
            value:false
        })
    }
    
}
module.exports = {
    verifyUserExistMiddle,
    userExists
}