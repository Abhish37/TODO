import { useContext, useEffect, useState } from "react"
import {IsLoggedIn} from "../Contexts/Atoms"
import { useRecoilValue, useSetRecoilState } from "recoil";
import Cookies from "universal-cookie";

export default function NavBarLoggedIn(prop){
    const cookie = new Cookies();
    const setIsLoggedIn = useSetRecoilState(IsLoggedIn);
    function logOut(){
        cookie.remove("token");
        setIsLoggedIn(false);
    }
    return(<div>
        Hi {prop.userName} !!
        <button style={{marginLeft:"20px", height:"40px"}} onClick={logOut}>LogOut</button>
    </div>)
}