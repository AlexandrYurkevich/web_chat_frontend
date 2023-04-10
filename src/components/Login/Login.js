import "./styles.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { WebContext } from "../../WebContext";

export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = useContext(WebContext);

    const tryLogin = async () => {
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/login", {
                login: login,
                password : password
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        }
        catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err });
        }
    }
    return (
        <div class="login-background">
            <div class="login-form">
                <label style={{'align-self':'center'}}>Authorization</label>
                <input placeholder="Login" type="text" onChange={(e)=>{setLogin(e.target.value)}}></input>
                <input placeholder="Password" type="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
                <div class="loginorreg">
                    <button class="coolbut" onClick={()=> tryLogin()}>Authorize</button>
                    <button class="coolbut">Register</button>
                </div>
            </div>
        </div>
    );
  }