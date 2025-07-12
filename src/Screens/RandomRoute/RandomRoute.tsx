import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const oneSec = 1000;

const RandomRoute = ()=>{
    const navigate = useNavigate();
    const [time,setTime] = useState(5);
    const timer = useRef<any>(null);
    const redirect = ()=> navigate('/');

    const startTime = ()=> {
        if(timer.current) clearInterval(timer.current);
        timer.current = setInterval(()=>setTime((time)=>time - 1),oneSec);
    }; 

    useEffect(()=>{
       startTime();
       ()=> clearTimeout(timer.current);
    },[])

    
    useEffect(()=>{
        if(time === 1) redirect();
        ()=> clearTimeout(timer.current);
    },[time])

    return <div>The Route you're trying to access. It doesn't exists dear, Redirecting you back in {time} seconds...</div>
};

export default RandomRoute;