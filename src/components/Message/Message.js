import "./styles.css";

export default function Message({message, owner, turn}) {
  return (
    <div class={"chat-message" + (owner ? " chat-message-my" : "") + (turn ? " tail" : "")}>
        <div class="chat-message-inner">
            <label>{message.sender}</label>
            <label class="mes-message">{message.text}</label>
            <label class="mes-sended" style={{'align-self':'flex-end'}}>{message.sended}</label>
        </div>
    </div>
  );
}