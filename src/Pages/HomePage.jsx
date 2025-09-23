import PageLayout from "./PageLayout";
import "./HomePage.css"
import TodoCard from "../Components/TodoCard";
import TodoForm from "../Components/TodoForm";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {IsLoggedIn, TodoFormVisible,Todos, userName,isLoding} from "../Contexts/Atoms"
import { useEffect} from "react";
import Cookies from "universal-cookie";

export default function HomePage(){
    const cookie = new Cookies();
    const setUserName = useSetRecoilState(userName);
    const setIsLoggedIn = useSetRecoilState(IsLoggedIn);
    const IsLoggedInVal = useRecoilValue(IsLoggedIn);
    const setTodoFormVisible = useSetRecoilState(TodoFormVisible);
    // const TodoArray = useRecoilValue(Todos);
    // const setTodoArray = useSetRecoilState(Todos);
    const [TodoArray,setTodoArray] = useRecoilState(Todos);
    const [isLodingVal,setIsLoading] = useRecoilState(isLoding);

    
    try{
        useEffect(()=>{
            async function f(){
                setIsLoading(true);
                const user = await fetch("http://localhost:3000/Todo",{
                    method:"GET",
                    credentials:"include"
                }).then(res=>res.json()).then(res=>res);
                // console.log(user.TodoArray);
                if(user.value){
                    setIsLoggedIn(true);
                    console.log(user.username);
                    setUserName(user.username);
                    setTodoArray(user.TodoArray);
                }
                setIsLoading(false);
                // console.log(TodoArray);
            }
            if(cookie.get("token")){
                setIsLoggedIn(true);
                f();
            }   
            
        },[])

    }catch(err){
        console.log(err);
    }
    
    function handleAddTodoClick(){
        setTodoFormVisible(true);
    }
    return<PageLayout>
        {IsLoggedInVal?
        <>
            <TodoForm/>
            <div className="Outer-Home-Page" style={{paddingTop:"40px"}}>
                <div className="Outer-Home-Page-L1">
                    <h1 className="Outer-Home-Page-L1-header">Todo</h1>
                    <button onClick={handleAddTodoClick}>Add Todo</button>
                    <div style={{height:"100vh"}}>
                        {isLodingVal?<>Loading...</>:<>
                        {
                        TodoArray.filter((ele)=>!ele.InProgess).map((ele,ind)=><TodoCard 
                        key = {ele._id}
                        _id = {ele._id}
                        title = {ele.title}
                        Deadline = {ele.Deadline}
                        Priority = {ele.Priority}
                        description = {ele.description}
                        User_id={ele.User_id}
                        />)
                        }
                        </>}
                        
                    </div>
                    
                </div>
                <div className="Outer-Home-Page-L1">
                    <h1 className="Outer-Home-Page-L1-header">In Progess</h1>
                </div>
                <div className="Outer-Home-Page-L1">
                    <h1 className="Outer-Home-Page-L1-header">Done</h1>
                </div>
            </div>
        </>
:<>
<div style={{height:"100vh", display:"flex",justifyContent:"center" , alignItems:"center"}}>
    <div style={{display:"flex"}}>
        <h1>Please Signup/Login to Continue</h1>
    </div>
    
</div>

</>}
        
    </PageLayout>
    
}