import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role,setRole] = useState("user");

 

  const logindata = async () => {
    let result = await fetch("http://localhost:5000/api/users/signin", {
      method: "post",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    localStorage.setItem("user",JSON.stringify(result.respose));
    localStorage.setItem("token",JSON.stringify(result.token));
    navigate("/");
  };
  return <div className="login-container">
    <h1>Signup</h1>
    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
    <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)}/>
    <button onClick={logindata}>Signup</button>

  </div>;
}
