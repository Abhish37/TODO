import { useEffect, useState } from "react";

export default async function useFetch(url){
    const [data,setData] = useState();
    const [loading,setLoading] = useState(false);

    useEffect(async ()=>{
        console.log("in fetch")
        setLoading(true);
        const fetchData = async ()=>{ await fetch(url)
        .then(async (res)=>await res.json())
        .then(res=>setData(res))
        .catch((err)=>{
            setData(err);
        })
        }
    },[]);
    
    useEffect(async ()=>{
        console.log("in fetch")
        setLoading(true);
        const fetchData = async ()=>{ await fetch(url)
        .then(async (res)=>await res.json())
        .then(res=>setData(res))
        .catch((err)=>{
            setData(err);
        })
        }
    },[url]);

    return {data,loading};
}