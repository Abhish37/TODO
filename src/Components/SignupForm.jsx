import { useState } from "react";
import "./SignupForm.css"
import { useNavigate } from "react-router-dom";

export default function SignupForm(){
    const [isValidUser,setIsValidUser] = useState(true);
    const [isValidEmail,setIsValidEmail] = useState(true);
    const [isSubmitting,setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    async function handleUsername(e){
        console.log("In HandleUsername")
        const value = e.target.value;
        const res = await fetch("http://localhost:3000/Login/FindUser",{
            method:"POST",
            headers:{
            "Content-type":"application/json"
            },
            body:JSON.stringify({
                username:value
            })
        }).then((res)=>res.json())
        .then(res=>res.username);
        console.log(res);
        setIsValidUser(!res);
    }

    async function handleEmail(e){
        const value = e.target.value;
        const res = await fetch("http://localhost:3000/Login/FindEmail",{
            method:"POST",
            headers:{
            "Content-type":"application/json"
            },
            body:JSON.stringify({
                email:value
            })
        }).then((res)=>res.json())
        .then(res=>res.found);
        console.log(res);
        setIsValidEmail(!res);
    }

    async function handleSubmit(e){
        e.preventDefault();
        console.log("Hi From Submit");
        setIsSubmitting(true);
        const res = await fetch("http://localhost:3000/SignUp",{
            method:"POST",
            headers:{
            "Content-type":"application/json"
            },
            body:JSON.stringify({
                name:e.target.name.value,
                username:e.target.username.value,
                password:e.target.password.value,
                Age:e.target.Age.value,
                email:e.target.email.value
            })
        }).then((res)=>res.json())
        .then(res=>res.value)
        .catch(err=>{
            console.error("Error Occured While Sending Data");
            console.error(err);
        })
        e.target.reset();
        setIsSubmitting(false);
        if(res){
            navigate("/Login");
        }
       

    }

    return<div className="outer-sign-up-wrapper">
        <div className="outer-sign-up-L0">
            <div className="outer-sign-up-wrapper-L1">
               <h1 style={{textDecoration:"underline"}}>Signup</h1> 
            </div>
            <div className="outer-sign-up-wrapper-L1">
                <div className="outer-sign-up-wrapper-L2">
                    <form onSubmit={handleSubmit}>
                        <div className="outer-sign-up-wrapper-L3">
                            <label htmlFor="username">Enter Username: </label>
                            <input name = "username" id =  "username" placeholder="Username" onChange={handleUsername} required={true}/>
                            {!isValidUser&&<p style={{color:"red",fontSize:"12px",paddingLeft:"120px"}}>Username Already Exists</p>}
                        </div>

                        <div className="outer-sign-up-wrapper-L3">
                            <label htmlFor="name">Enter Name: </label>
                            <input name = "name" id =  "name" placeholder="Name" required={true}/>
                        </div>

                        <div className="outer-sign-up-wrapper-L3">
                            <label htmlFor="password">Enter password: </label>
                            <input name = "password" id =  "password" type = "password" placeholder="Password" required={true}/>
                        </div>

                        <div className="outer-sign-up-wrapper-L3">
                            <label htmlFor="Age">Enter Age: </label>
                            <input name = "Age" id =  "Age" type = "Number" placeholder="Age" required={true}/>
                        </div>

                        <div className="outer-sign-up-wrapper-L3">
                            <label htmlFor="email">Enter email: </label>
                            <input name = "email" id =  "email" type = "email" placeholder="Email" onChange={handleEmail} required={true}/>
                            {!isValidEmail&&<p style={{color:"red",fontSize:"12px",paddingLeft:"90px"}}>Email Already in Use</p>}
                        </div>
                        <div className="outer-sign-up-wrapper-L3">
                            <button type="submit" disabled ={!isValidEmail || !isValidUser || isSubmitting}>
                               {isSubmitting?<>SigningIn...</>:<>Signup</>} 
                            </button>
                        </div>
                    </form>
                </div>

            </div>
            
        </div>
    </div>
}