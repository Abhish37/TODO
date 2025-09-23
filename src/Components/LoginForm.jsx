import { useNavigate } from "react-router-dom";
import "./LoginForm.css"
import { useState } from "react";
import Cookies from "universal-cookie";

export default function LoginForm(){
    const navigate = useNavigate();
    const [isValid,setIsValid] = useState(true);
    const [isChecking,setIsChecking] = useState(false);
    async function handleSubmit(e){
        setIsChecking(true);
        e.preventDefault();
        console.log(e.target.username.value);
        console.log(e.target.password.value);
        const res = await fetch("http://localhost:3000/Login",{
            method:"POST",
            credentials: 'include',
            headers:{
            "Content-type":"application/json"
            },
            body:JSON.stringify({
                username:e.target.username.value,
                password:e.target.password.value
            })
        }).then((res)=>res.json())
        .then(res=>res.value);
        setIsChecking(false);
        if(res){
            
            navigate("/");
        }

    }
    async function handleUsername(e){
        const value = e.target.value;
        setIsValid(false);
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
        setIsValid(res);
    }
    return<div style={{height:"100vh",width:"800px", backgroundColor:"black"}} className="LoginFormOuter">
        <div className="LoginFormOuterL1">
            <form onSubmit={handleSubmit}>
                <div className="LoginFormOuterL2">
                    <div>
                        <h2 style={{textDecoration:"underline",fontSize:"36px"}}>LOGIN</h2>
                    </div>
                    <div>
                        <label htmlFor="username">Enter Username: </label>
                        <input name = "username" id = "username" placeholder=" Username" onChange={handleUsername} required={true}/>
                        {!isValid && <p style={{color:"red", fontSize:"12px", paddingLeft:"125px"}}>Username Doesn't Exists</p>}
                        
                    </div>

                    <div>
                        <label htmlFor="password">Enter Username: </label>
                        <input name = "password" id = "Password" placeholder=" Password" required={true} type = "password"/>
                    </div>
                    
                    <div>
                        <button type="submit" disabled = {isChecking}>Submit</button>
                    </div>
                </div>
                

            </form>
        </div>
        
    </div>
}