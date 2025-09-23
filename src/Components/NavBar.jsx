import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import "./NavBar.css";
import NavBarLoggedIn from "./NavBarLoggedIn";
import NavBarUnLogged from "./NavBarUnLogged";
import {IsLoggedIn,userName} from "../Contexts/Atoms"
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

export default function NavBar(){
    const cookie = new Cookies();
    const username = useRecoilValue(userName);
    const IsLoggedInValue = useRecoilValue(IsLoggedIn);
    
    


    

    return(
        <div className="NavBar-wrapper">
            <div><Link to={"/"}>TodoByAsh</Link></div>
            {IsLoggedInValue?<NavBarLoggedIn userName = {username}/>:<NavBarUnLogged/>}
        </div>
    )
}