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
    const [deletedMessage, setDeletedMessage] = useState(null);
    const [updatedMessage, setUpdatedMessage] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const [messageList, setMessageList] = useState([]);
    const scrollToLast = useRef();
    const socket = useRef();
    const { user, setUser } = useContext(WebContext)
    var turn = true;
    var currentLast = user.login;

    useEffect(()=>{
        sendedMessage && setMessageList([...messageList, sendedMessage]);
    }, [sendedMessage])

    useEffect(()=> {
        if(!updatedMessage)
            return;
        let updatedList =[...messageList]
        let updatedIndex = messageList.findIndex((msg) => msg._id == updatedMessage._id);
        updatedList[updatedIndex] = updatedMessage
        setMessageList(updatedList);
    }, [updatedMessage]);

    useEffect(()=> {
        if(!deletedMessage)
            return;
        let filteredMessages = messageList.filter((msg) => msg._id !== selectedMessage);
        setMessageList(filteredMessages);
    }, [deletedMessage]);

    useEffect(() => {
        socket.current = io("ws://localhost:3002");
        socket.current.on("getMessage", (data) => {
            console.log("get " + data._id)
            setSendedMessage(data);
        });
        socket.current.on("getDeletedMessage", (data) => {
            setDeletedMessage(data);
        });
        socket.current.on("getUpdateMessage", (data) => {
            setUpdatedMessage(data);
        });

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
        if(!inputMessage)
            return;
        console.log("nessage to send: " + inputMessage);
        var now = new Date();

        const newMessage = {
            sender: user.login,
            text: inputMessage,
            sended: now.getHours() + ":" + now.getMinutes().toString().padStart(2, 0)
        };
        try {
            const res = await axios.post("http://localhost:3001/messages/", newMessage);
            console.log("response " + res.data.sender);
            socket.current.emit("sendMessage",  res.data);

            setInputMessage("")
            document.getElementsByClassName("chat-input-field")[0].innerText = ""
        }
        catch (err) {
            console.log(err);
        }
    }

    const onDelete = async () =>{
        try {
            const res = await axios.delete("http://localhost:3001/messages/delete", { params: { id: selectedMessage } });
            console.log(selectedMessage + " deleted")
            socket.current.emit("deleteMessage", selectedMessage);
            setSelectedMessage(null);
        }
        catch (err) {
            console.log(err);
        }
    }

    const onUpdate = async () =>{
        const selected = messageList.find((mes) => mes._id == selectedMessage)
        console.log("selected mes is " + selected._id);
        const updatedMessage = {...selected, text: inputMessage }
        try {
            const res = await axios.put("http://localhost:3001/messages/update", updatedMessage);
            console.log(selectedMessage + " updated")
            socket.current.emit("updateMessage", res.data);
            setSelectedMessage(null);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        scrollToLast.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList]);

    return (
        <div class="flex-container">
            <div class="chat-header">
                <div></div>
                <label>You're authorized as {user.login}</label>
                <button class="logout" onClick={()=>setUser(null)}>Logout</button>
            </div>
            <div class="chat-content">
                {messageList.map(message =>{
                    if(currentLast !== message.sender && turn === false){
                        turn = true;
                    }
                    currentLast = message.sender
                    let isOwner = (user.login == message.sender)
                    let mes = <div
                            key={message._id}
                            onClick={()=> isOwner && setSelectedMessage(selectedMessage==message._id ? null : message._id )}
                            style={Object.assign({}, 
                                isOwner ? { 'align-self': 'flex-end' } : { 'align-self': 'flex-start' }, 
                                selectedMessage == message._id ? { border: "2px white solid", borderRadius: 5 } : {}
                            )}
                            ref={scrollToLast}
                        >
                        <Message message={message} owner={isOwner} turn={turn}/>
                    </div>;
                    turn = false
                    return mes;
                })}
            </div>
            <div class="chat-footer">
                {/* <textarea class="chat-input-field" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} /> */}
                <div class="chat-input-field" role="textbox" aria-multiline="true" contenteditable="true" onInput={(e)=> setInputMessage(e.target.innerText)}></div>
                <input type="image" src={sendIcon} alt="send" style={{height:5 + 'vh'}} onClick={()=> onSendMessage()}/>
                {selectedMessage ? 
                <div
                    className="mesActions"
                    style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "white",
                    borderRadius: 5,
                    gap: 2
                    }}
                >
                    <button onClick={()=> onDelete()} style={{ background: "black", color: "white", borderRadius: 5 }}>
                    Delete
                    </button>
                    <button onClick={()=> onUpdate()} style={{ background: "black", color: "white", borderRadius: 5 }}>
                    Change
                    </button>
                </div>
                : ""}
            </div>
        </div>
    );
  }