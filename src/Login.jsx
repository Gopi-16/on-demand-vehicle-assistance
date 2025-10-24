import React from "react";
import { useState } from "react";
import axios from "axios";
const Login=()=>{
    const [username,setuserName]=useState("");
    const [Password,setPassword]=useState("");
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const data={username,password:Password};
        //console.log(data)
        const response= await axios.post("http://localhost:8000/api/auth/login",data)
        //console.log(response)
        const {token} = response.data;
        await localStorage.setItem("token",token);
    }
    return(
        <div>
            Email/Mobile: 
            <input id="username" name="username" placeholder="email/mobile" onChange={e=>setuserName(e.target.value)}></input>
            Password:
            <input id="password" name="password" onChange={e=>setPassword(e.target.value)}></input>

            <button onClick={handleSubmit} >Submit</button>
        </div>

)
}
export default Login;