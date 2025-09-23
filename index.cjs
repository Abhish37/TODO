const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const {route:signup} = require("./routes/signup.cjs");
const {route:login} = require("./routes/Login.cjs");
const {route:Todo} = require("./routes/Todos.cjs");

async function Build() {
    let Connected = false;
    await mongoose.connect(process.env.MOONGOSE_CONNECTION_STRING);
    Connected = true;
    return Connected;

}
async function connect(){
    let res = await Build();
    console.log(res);
}

connect();

const app = express();


app.use("/SignUp",signup);
app.use("/Login",login);
app.use("/Todo",Todo);



app.listen(3000);