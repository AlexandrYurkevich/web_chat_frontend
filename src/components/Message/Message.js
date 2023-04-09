import "./styles.css";

export default function Message({message, owner, turn}) {
  return (
    <div class={"chat-message" + (owner ? " chat-message-my" : "") + (turn ? " tail" : "")}>
        <div class="chat-message-inner">
            <label>{message.userName}</label>
            <textarea class="mes-message" disabled="true">{message.text}</textarea>
            <label class="mes-sended" style={{'align-self':'flex-end'}}>{message.sended}</label>
        </div>
    </div>
  );
}