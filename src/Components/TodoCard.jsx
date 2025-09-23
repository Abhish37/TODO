import { useRecoilState } from "recoil";
import Deadline from "./Deadline"
import "./TodoCard.css"
import { isLoding,Todos } from "../Contexts/Atoms";
import DeadlineTimer from "./DeadlineTimer";

export default function TodoCard(props){
    const [isLodingVal,setIsLoading] = useRecoilState(isLoding);
    const [TodoArray,setTodoArray] = useRecoilState(Todos);
    
    async function handleDelete(e){
        console.log("User_id: "+props.User_id);
        console.log("_id: "+props._id);
        setIsLoading(true);
        const res =  await fetch("http://localhost:3000/Todo/delete",{
            method:"DELETE",
            credentials:"include",
            headers:{
                User_id:props.User_id,
                _id:props._id
            }
        }).then(res=>res.json())
        .then(res=>res)
        .catch(err=>{
            console.error(err)
        })
        console.log("res value: " + res.value);
        if(res.value){
            const user = await fetch("http://localhost:3000/Todo",{
                method:"GET",
                credentials:"include"
            }).then(res=>res.json()).then(res=>res);
            console.log(user.TodoArray);
            if(user.value){
                setTodoArray(user.TodoArray);
            }
            console.log(TodoArray);
        }
        setIsLoading(false);

    }
    return <div className="TodoCard-wrapper">
        {/* <button className="close-inside-card">X</button> */}
        <div>
            <h2 style={{ display:"flex" ,justifyContent:"center", textDecoration:"underline", paddingBottom:"20px"}}><b>{props.title}</b></h2>
        </div>
        
        <div>
            <p><span style={{textDecoration:'underline'}}>Description</span>: {props.description}</p>
            <p><span style={{textDecoration:'underline'}}>Deadline</span>: <Deadline Deadline = {props.Deadline}/></p>
            <p><span style={{textDecoration:'underline'}}>Priority</span>: {props.Priority}</p>
            <p><span style={{textDecoration:'underline'}}>Time Left</span> :<DeadlineTimer Deadline = {props.Deadline}/></p>
            <div className="TodoCardButtons">
                <button className="TodoCardButtonsValue">{!props.InProgess?<>Move to InProgress</>:<>Move To Todo</>}</button>
                <button className="TodoCardButtonsValue" onClick={handleDelete} disabled={isLodingVal}>{isLodingVal?<>Removing</>:<>Remove Todo</>}</button>
            </div>
            
        </div>
    </div>
}