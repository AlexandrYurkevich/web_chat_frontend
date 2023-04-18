import "./styles.css";
import sendIcon from "../../images/send-icon.png"
import React, { useState, useEffect, useRef, useContext } from "react";
import { WebContext } from "../../WebContext"
import Message from "../Message/Message";
import axios from "axios";
import { io } from "socket.io-client";

export default function Chat() {
    const [inputMessage, setInputMessage] = useState("");
    const [sendedMessage, setSendedMessage] = useState(null);
    const [messageList, setMessageList] = useState([]);
    const scrollToLast = useRef();
    const socket = useRef();
    const { user, dispatch } = useContext(WebContext)
    var turn = true;
    var currentLast = user._id;

    useEffect(() => {
        sendedMessage && sendedMessage.sender != user._id && setMessageList([...messageList, sendedMessage]);
    }, [sendedMessage]);

    useEffect(() => {
        socket.current = io("ws://localhost:3002");
        socket.current.on("getMessage", (data) => { setSendedMessage(data); });

        const getMessages = async () => {
            try {
                const res = await axios.get("http://localhost:3001/messages/");
                console.log("getMessages " + res);
                setMessageList(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, []);

    const onSendMessage = async () => { 
        console.log("nessage to send: " + inputMessage);
        var now = new Date();

        const newMessage = {
            sender: user._id,
            text: inputMessage,
            sended: now.getHours() + ":" + now.getMinutes().toString().padStart(2, 0)
        };
        try {
            const res = await axios.post("http://localhost:3001/messages/", newMessage);
            console.log("resp " + res.data.sender);
            setMessageList([...messageList, res.data]);
            setInputMessage("")
            document.getElementsByClassName("chat-input-field")[0].innerText = ""
            socket.current.emit("sendMessage",  res.data);
        } catch (err) {
            console.log(err);
        }
    }
    function inputChange(e){
        setInputMessage(e.target.innerText);
        console.log("input chnage " + inputMessage)
    }

    useEffect(() => {
        scrollToLast.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList]);

    return (
        <div class="flex-container">
            <div class="chat-header">
                <label>{user.login}</label>
                <button class="logout" onClick={dispatch({ type: "LOGIN_START"})}>Logout</button>
            </div>
            <div class="chat-content">
                {messageList.map(message =>{
                    if(currentLast !== message.sender && turn === false){
                        turn = true;
                    }
                    currentLast = message.sender
                    let isOwner = (user._id == message.sender)
                    let mes = <div style={ isOwner ? { 'align-self':'flex-end'} : {'align-self':'flex-start'} } ref={scrollToLast}>
                        <Message message={message} owner={isOwner} turn={turn}/>
                    </div>;
                    turn = false
                    return mes;
                })}
            </div>
            <div class="chat-footer">
                <div class="chat-input-field" role="textbox" aria-multiline="true" contenteditable="true" onInput={(e)=> inputChange(e)}></div>
                <input type="image" src={sendIcon} alt="send" style={{height:5 + 'vh'}} onClick={()=> onSendMessage()}/>
            </div>
        </div>
    );
  }