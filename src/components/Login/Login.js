import "./styles.css";
import React, { useState } from "react";

export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div class="login-background">
            <div class="login-form">
                <label style={{'align-self':'center'}}>Authorization</label>
                <input placeholder="Login" type="text" onChange={(e)=>{setLogin(e.target.value)}}></input>
                <input placeholder="Password" type="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
                <div class="loginorreg">
                    <button class="coolbut">Authorize</button>
                    <button class="coolbut">Register</button>
                </div>
            </div>
        </div>
    );
  }