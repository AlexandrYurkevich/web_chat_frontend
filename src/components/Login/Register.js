import "./styles.css";
import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { WebContext } from "../../WebContext";


export default function Register() {
    const login = useRef();
    const password = useRef(); 
    const { setUser } = useContext(WebContext);
    const [saveUserCheck, setSaveUserCheck] = useState(false);
    const [errormes, setErrormes] = useState();

    const navigate = useNavigate();

    const tryRegister = async () => {
        try {
            const res = await axios.post("http://localhost:3001/auth/register", {
                login: login.current.value,
                password : password.current.value
            });
            if(saveUserCheck){
                console.log("login is saved");
                localStorage.setItem("chat-user", JSON.stringify(res.data))
            }
            sessionStorage.setItem("chat-user", JSON.stringify(res.data))
            setUser(res.data);
        }
        catch (err) {
            setErrormes(err.response.data.message);
        }
    }
    return (
        <div className="login-background">
            <form className="login-form" onSubmit={(e)=>{e.preventDefault(); tryRegister()}}>
                <label style={{'align-self':'center'}}>Registration</label>
                <label style={{color: 'red'}}>{errormes}</label>
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
                    <input className="coolbut" type="submit" value="Register"/>
                    <input className="coolbut" type="button" onClick={()=> navigate("/login")} value="Authorize"/>
                </div>
            </form>
        </div>
    );
  }