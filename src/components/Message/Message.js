import "./styles.css";

export default function Message({message, owner, turn}) {
  return (
    <div onSelect={()=>console.log("selected")} className={"chat-message" + (owner ? " chat-message-my" : "") + (turn ? " tail" : " notail")}>
        <div className="chat-message-inner">
            <label>{message.sender}</label>
            <label>{message.text}</label>
            <label className="mes-sended" style={{'align-self':'flex-end'}}>{message.sended}</label>
        </div>
    </div>
  );
}