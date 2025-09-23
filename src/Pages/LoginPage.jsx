import LoginForm from "../Components/LoginForm";
import PageLayout from "./PageLayout";

export default function LoginPage(){
    return(<PageLayout>
        <div style={{display:"flex",justifyContent:"center"}}>
            <LoginForm/>
        </div>
        
    </PageLayout>)
}