import React from "react";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import "./Login.css";


function Login() {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginInput) {
      alert("Please enter email or mobile number");
      return;
    }

    if (!password) {
      alert("Please enter password");
      return;
    }

    if (!checked) {
      alert("Please agree to Terms & Conditions");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://myntraclone-backend-pcv6.onrender.com/login",
        {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          loginInput: loginInput,
          password: password
        }),
      });

      const data = await response.json();

      if(response.ok){
       const loginUser = {
  _id: data.user._id,   
  phone: data.user.phone,
  name: data.user.name
};
        alert("Login successful! Phone: " + loginUser.phone);
       localStorage.setItem('user', JSON.stringify(loginUser));
        window.location.href="/home";
      } else {
        alert(data.message || "Login failed. Please try again.");
      }

    }catch(error){
      console.error("Error:",error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
         <img src = "/myntra.jpeg" alt="Offer Banner" className="login-banner" />
      

        <div className="login-content">
          <h2>Login <span>or Signup</span></h2>

          <form onSubmit={handleSubmit}>
            <div className="mobile-input">
              <input type="text" placeholder="Email or Mobile Number" value={loginInput}  onChange={(e) => setLoginInput(e.target.value)}
              />
            </div>

            <div className="mobile-input">
              <input  type="password"  placeholder="Password"  value={password}
                onChange={(e) => setPassword(e.target.value)}  />
            </div>

            <div className="terms">
              <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)}  />
              <p>
                By continuing, I agree to the 
        <span className="pink"> Terms of Use </span> & 
                <span className="pink"> Privacy Policy </span>
              </p>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "LOGIN"}
            </button>
</form>


<p>
  Dont have a account <a href="/signup">Signuo</a>
</p>
<p className="help">
  Have trouble logging in? <span>Get help</span>
</p>
        </div>
      </div>
    </div>
  );
}

export default Login;

