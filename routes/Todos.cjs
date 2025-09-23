const express = require("express");
const {SignUpModel,TodoModel} = require("./db.cjs");
const {verifyUserExistMiddle,userExists} = require("./verifyUserExistMiddle.cjs");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const jwt = require("jsonwebtoken");


const route = new express.Router();

route.use(express.json());
route.use(cookieParser());
route.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

route.post("/",verifyUserExistMiddle,userExists,async (req,res)=>{
    // console.log(req.body.Deadline);
    const data = await TodoModel.create({
        name:req.body.name,
        description:req.body.description,
        Priority:req.body.Priority,
        Deadline:req.body.Deadline,
        User_id:req.body.user._id
    })
    // console.log(data);
    await SignUpModel.updateOne({
        _id:data.User_id
    },{
        $push:{Todos:data}
    })
    console.log("Todos: "+await SignUpModel.findById(data.User_id).populate("Todos"));
    
    res.status(200).json({
        message:"todoAdded",
        value:true
    })
})

route.get("/",verifyUserExistMiddle,userExists,async (req,res)=>{
    const data = await SignUpModel.findById(req.body._id).populate("Todos");
    const Todos = data.Todos;
    let TodoArray = [];
    for(let i = 0 ; i < Todos.length ; i++){
        TodoArray.push({
            _id:Todos[i]._id.toString(),
            title:Todos[i].name,
            description:Todos[i].description,
            Priority:Todos[i].Priority,
            Deadline:Todos[i].Deadline,
            InProgress:Todos[i].InProgress,
            User_id:req.body._id
        })
    }
    res.status(200).json({
        message:"done",
        value:true,
        TodoArray:TodoArray,
        username:data.username,
        name:data.name
    })
})

route.delete("/delete",verifyUserExistMiddle,async (req,res)=>{
    try {
        console.log("req headers: "+req.header("User_id"));
        console.log("req headers: "+req.header("_id"));
        const user = await SignUpModel.findById(req.header("User_id"));

        user.Todos = user.Todos.filter((ele)=>ele.toString() != req.header("_id"));

        await user.save();

        await TodoModel.findByIdAndDelete(req.header("_id"));

        res.status(200).json({
            value:true,
            message:"deleted"
        })
    } catch (error) {
        res.status(400).json({
            value:false,
            message:"Error occured",
            err:error
        })
    }

})

module.exports={
    route
}