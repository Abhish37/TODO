import { useNavigate } from "react-router-dom"

export default function NavBarUnLogged(){
    const navigate = useNavigate();
    function navigateToLogin(){
        navigate("/Login")
    }
    function navigateToSignup(){
        navigate("/Signup")
    }
    return(<div>
        <button onClick={navigateToLogin}>Login</button>
        <button onClick={navigateToSignup}>SignUp</button>
    </div>)
}