const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const Todo = new Schema({
    name:String,
    description:String,
    Priority:String,
    Deadline:Date,
    InProgress:{type:Boolean,default:false},
    User_id:{type:mongoose.Types.ObjectId,ref:"users"}
},{
    timestamps:true
})


const SignUp = new Schema({
    name:String,
    username:{type:String,unique:true},
    password:String,
    Age:Number,
    email:{type:String,unique:true},
    Todos:[{type:mongoose.Types.ObjectId,ref:"todos"}]
})


const SignUpModel = mongoose.model("users",SignUp);
const TodoModel = mongoose.model("todos",Todo);

SignUp.path('Todos').ref("todos");
Todo.path('User_id').ref("users");

module.exports = {
    SignUpModel,
    TodoModel
}

