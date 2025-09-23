import { useState } from "react";
import "./TodoForm.css"
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoding, IsLoggedIn, TodoFormVisible,Todos, userName } from "../Contexts/Atoms";


export default function TodoForm(){
    const [todoFormVisible,setTodoFormVisible] = useRecoilState(TodoFormVisible);
    const [TodoArray,setTodoArray] = useRecoilState(Todos);
    const [isLodingVal,setIsLoading] = useRecoilState(isLoding);

    function formClosed(e){
        setTodoFormVisible(false);
    }
    async function handleSubmit(e){
        e.preventDefault();
        console.log(e.target.DateAndTime.value);
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/Todo",{
            method:"POST",
            headers:{
            "Content-type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({
                name:e.target.TodoName.value,
                description:e.target.TodoDescription.value,
                Priority:e.target.Priority.value,
                Deadline:e.target.DateAndTime.value,
            })
        }).then((res)=>res.json())
        .then(res=>res);
        if(res.value){
            const user = await fetch("http://localhost:3000/Todo",{
                method:"GET",
                credentials:"include"
            }).then(res=>res.json()).then(res=>res);
            console.log(user.TodoArray);
            if(user.value){
                setTodoArray(user.TodoArray);
            }
            setIsLoading(false);
            console.log(TodoArray);
        }
        e.target.reset();
        setTodoFormVisible(false);
    }


    return(todoFormVisible && <div className="TodoFormContainer">
        <button className="close-btn" onClick={formClosed}>&times;</button>
        <form onSubmit={handleSubmit}>
            <div style={{ display:"flex", justifyContent:"center"}}>
                <h1 style={{textDecoration:"underline"}}>Todo</h1>
            </div>
            <div className="TodoForm">
                <label htmlFor="TodoName">Enter Todo:  </label>
                <input className = "TodoFormContainerInput " name = "TodoName" id = "TodoName" required= {true}/>
            </div>
            
            <div>
                <label htmlFor="TodoDescription">Enter Description:  </label>
                <input  className = "TodoFormContainerInput " name = "TodoDescription" type="text" id = "TodoDescription" required= {true}/>
            </div>
            <div>
                <label htmlFor="Priority">Enter Priority: </label>
                <input type="radio" value = "Low" name = "Priority" id = "Priority"/>Low
                <input type="radio" value = "Medium" defaultChecked name = "Priority" id = "Priority"/>Medium
                <input 
                type="radio" 
                value = "High"
                 name = "Priority" 
                 id = "Priority" />High
            </div>

            <div>
                <label>Enter Date and Time:  </label>
                <input name = "DateAndTime" type="datetime-local"/>
            </div>
            <div>
                <button type="submit" style={{marginLeft:"128px"}}
                disabled = {isLodingVal}>{isLodingVal?<>Adding</>:<>Add Todo</>}</button>
            </div>
        </form>
    </div>)
}