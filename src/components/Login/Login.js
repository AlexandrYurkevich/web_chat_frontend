import "./styles.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { WebContext } from "../../WebContext";

export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { isAuth, dispatch } = useContext(WebContext);

    const tryLogin = async () => {
        console.log("auth " + isAuth);
        if(!isAuth){
            dispatch({ type: "LOGIN_START"});
            return;
        }
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
    const tryRegister = async () => {
        console.log("reg " + isAuth);
        if(isAuth){
            dispatch({ type: "REG_START"});
            return;
        }
        dispatch({ type: "REG_START" });
        try {
            const res = await axios.post("auth/register", {
                login: login,
                password : password
            });
            dispatch({ type: "REG_SUCCESS", payload: res.data });
        }
        catch (err) {
            dispatch({ type: "REG_FAILURE", payload: err });
        }
    }
    return (
        <div class="login-background">
            <div class="login-form">
                <label style={{'align-self':'center'}}>{isAuth ? "Authorization" : "Registration" }</label>
                <input placeholder="Login" type="text" onChange={(e)=>{setLogin(e.target.value)}}></input>
                <input placeholder="Password" type="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
                <div class="loginorreg">
                    <button class="coolbut" onClick={()=> tryLogin()}>Authorize</button>
                    <button class="coolbut" onClick={()=> tryRegister()}>Register</button>
                </div>
            </div>
        </div>
    );
  }