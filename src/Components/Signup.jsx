import React from "react";
import { useState } from "react";
import "./Signup.css";

function Signup() {

  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) =>{
    e.preventDefault();

    if(name === "" || phone === "" || email === "" || password === "" || confirmPassword === ""){
      alert("Please fill all details");
      return;
    }

    if(phone.length !== 10 || isNaN(phone)){
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    if(password !== confirmPassword){
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          name: name,
          phone: phone,
          email: email,
          password: password,
          confirmPassword: confirmPassword
        }),
      });

      const data = await response.json();

      if(response.ok){
        alert("Signup successful! Please login.");
        window.location.href = "/";
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }

    }catch(error){
      console.error("Error:",error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        <img src="/myntra.jpeg" alt="Banner" className="signup-banner"/>

        <div className="signup-content">

          <h2>Create Account</h2>

          <form onSubmit={handleSignup}>

            <div className="signup-input">
              <input type="text"  placeholder="Full Name"  value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>

            <div className="signup-input">
              <input  type="text"  placeholder="Phone Number (10 digits)"  value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                maxLength={10}
              />
            </div>

            <div className="signup-input">
              <input  type="email"  placeholder="Email Address"  value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className="signup-input">
              <input   type="password"  placeholder="Create Password"  value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <div className="signup-input">
              <input  type="password"  placeholder="Confirm Password"   value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="signup-button" type="submit" disabled={loading}>
              {loading ? "Signing up..." : "SIGNUP"}
            </button>

          </form>

          <p className="signup-link">
            Already have an account? <a href="/">Login</a>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;

