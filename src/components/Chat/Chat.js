import "./styles.css";
import sendIcon from "../../images/send-icon.png"
import React, { useState, useEffect, useRef } from "react";
import Message from "../Message/Message";
import axios from "axios";

export default function Chat() {
    const [inputMessage, setInputMessage] = useState("");
    var turn = true;
    const [messageList, setMessageList] = useState([]);
    const scrollToLast = useRef();

    function onSendMessage() {
        console.log("nessage to send: " + inputMessage);
        var now = (new Date);

        const newMessage = {
            userName: "Author 1",
            text: inputMessage,
            sended: now.getHours() + ":" + now.getMinutes().toString().padStart(2, 0)
        };
        setMessageList([...messageList, newMessage]);
        setInputMessage("")
        document.getElementsByClassName("chat-input-field")[0].innerText = ""
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
                <img src="" alt="some icon"/>
                <label id="chat-name"></label>
            </div>
            <div class="chat-content">
                {messageList.map(message =>{
                    //if undefined userid =true
                    var mes = <div ref={scrollToLast}><Message message={message} owner={true} turn={turn}/></div>;
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