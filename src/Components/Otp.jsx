import { useState } from "react";

function Otp(){
    const[otp ,setOtp] =useState("");
     const verifyOtp = () =>{
        if(otp===""){
            alert("please enter otp");
            return;
        }
        if(otp.length!==6 || isNaN(otp)){
            alert("enter valid 6 digit otp");
            return;
        }
        alert("otp verified successfully");
        window.location.href="/home";
    
     };
     return(
        <div>
            <h2> enter otp</h2>
            <input type ="text" placeholder ="enter otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button onClick={verifyOtp}> verify otp</button>
        </div>

        
     );
}
export default Otp;