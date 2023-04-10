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
    const { user } = useContext(WebContext)
    var turn = true;
    var currentLast = user._id;

    useEffect(() => {
        setMessageList([...messageList, sendedMessage]);
    }, [sendedMessage]);

    useEffect(() => {
        // socket.current = io("http://localhost:8002");
        // socket.current.on("getMessage", (data) => { setSendedMessage(data); });

        const getMessages = async () => {
            try {
                const res = await axios.get("http://localhost:3001/messages/");
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
            //socket.current.emit("sendMessage",  res.data);
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
                {/* <img src="" alt="some icon"/> */}
                <label id="chat-name"></label>
            </div>
            <div class="chat-content">
                {messageList.map(message =>{
                    if(currentLast !== user._id && turn === false){
                        currentLast = user._id
                        turn = true;
                    }
                    console.log("user id " + user._id);
                    var isOwner = (user._id == message.sender)
                    console.log(user._id  + ", " + message.sender + " " + isOwner);
                    var mes = <div style={ "" + ((user._id == message.sender) ? {"align-self":"flex-end"} : "") } ref={scrollToLast}><Message message={message} owner={isOwner} turn={turn}/></div>;
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