import "./styles.css";
import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { WebContext } from "../../WebContext";


// salt, model limits, logout, jsonparse
// 404, strictmode, login save, checkaccount
export default function Login() {
    const login = useRef();
    const password = useRef(); 
    const { setUser } = useContext(WebContext);
    const [saveUserCheck, setSaveUserCheck] = useState(false);

    const navigate = useNavigate();

    const tryLogin = async () => {

        try {
            const res = await axios.post("http://localhost:3001/auth/login", {
                login: login.current.value,
                password : password.current.value
            });
            console.log("auth successed");
            if(saveUserCheck){
                console.log("login is saved");
                localStorage.setItem("chat-user", JSON.stringify(res.data))
            }
            sessionStorage.setItem("chat-user", JSON.stringify(res.data))
            setUser(res.data);
        }
        catch (err) {
            console.log(err.response.data.message);
            login.current.setCustomValidity(err.response.data.message);
        }
    }

    return (
        <div className="login-background">
            <form className="login-form" onSubmit={(e)=> {e.preventDefault(); tryLogin()}}>
                <label style={{'align-self':'center'}}>Authorization</label>
                <label>Login</label>
                <input
                    type="text"
                    required
                    ref={login}
                />
                <label>Password</label>
                <input
                    type="password"
                    required
                    minLength={6}
                    ref={password}
                />
                <div className="checkAccount">
                    <input type="checkbox" onChange={(e)=>setSaveUserCheck(!saveUserCheck)}/>
                    <label>Remember me?</label>
                </div>
                <div className="loginorreg">
                    <input className="coolbut" type="submit" value="Authorize"/>
                    <input className="coolbut" type="button" onClick={()=> navigate("/register")} value="Register"/>
                </div>
            </form>
        </div>
    );
  }