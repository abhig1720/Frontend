
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";





function Admin(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate = useNavigate();

    const adminEmail ="admin@gmail.com";
    const adminPassword = "admin123";

    const handleLogin =(e)=>{
        e.preventDefault();

        if(email === adminEmail && password === adminPassword){
            localStorage.setItem("isAdmin","true");
            navigate("/Admindashboard");
        }else{
            alert("Invalid admin credentials");
        }

    };

return(
    <div className ="container">
        <div className ="image-box">
            <img src="/myntra.jpeg" alt="Banner"/>
            <span className="close">&times;</span>
        </div>

        <div className ="content">
            <h2> Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Admin Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                 <input type="password" placeholder="Admin Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
<button type="submit"> Sign in</button>
            </form>
        </div>
    </div>
);


}

export default Admin;