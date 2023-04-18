import "./styles.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { WebContext } from "../../WebContext";

export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const { user, isAuth, dispatch } = useContext(WebContext);
    const [saveUserCheck, setSaveUserCheck] = useState(false);

    const tryLogin = async () => {
        console.log("auth " + isAuth);
        if(!isAuth){
            dispatch({ type: "LOGIN_START"});
            return;
        }
        if(!(login && password)){
            setErrMessage("login and password are required");
            return;
        }
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("http://localhost:3001/auth/login", {
                login: login,
                password : password
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            if(saveUserCheck){
                console.log("login is saved");
                localStorage.setItem("user", JSON.stringify(res.data))
            }
        }
        catch (err) {
            console.log(err);
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
            const res = await axios.post("http://localhost:3001/auth/register", {
                login: login,
                password : password
            });
            dispatch({ type: "REG_SUCCESS", payload: res.data });
            if(saveUserCheck)
                localStorage.setItem("user", JSON.stringify(user))
        }
        catch (err) {
            dispatch({ type: "REG_FAILURE", payload: err });
        }
    }
    return (
        <div className="login-background">
            <div className="login-form">
                <label style={{'align-self':'center'}}>{isAuth ? "Authorization" : "Registration" }</label>
                <label class="errLabel">{errMessage}</label>
                <input placeholder="Login" type="text" onChange={(e)=>{setLogin(e.target.value)}}></input>
                <input placeholder="Password" type="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
                <div className="checkAccount">
                    <input type="checkbox" onChange={(e)=>setSaveUserCheck(!saveUserCheck)}></input>
                    <label>Remember me?</label>
                </div>
                <div className="loginorreg">
                    <button className="coolbut" onClick={()=> tryLogin()}>Authorize</button>
                    <button className="coolbut" onClick={()=> tryRegister()}>Register</button>
                </div>
            </div>
        </div>
    );
  }