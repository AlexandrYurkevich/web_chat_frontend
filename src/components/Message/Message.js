import "./styles.css";

export default function Message({message, owner, turn}) {
  const timeformat = (timestamp)=> {
      const date = new Date(timestamp);

      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      const day = date.getUTCDate().toString().padStart(2, '0');
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');

      const formattedTimestamp = `${hours}:${minutes} ${day}.${month}`;
      return formattedTimestamp;
  }
  return (
    <div onSelect={()=>console.log("selected")} className={"chat-message" + (owner ? " chat-message-my" : "") + (turn ? " tail" : " notail")}>
        <div className="chat-message-inner">
            <label>{message.sender}</label>
            <label>{message.text}</label>
            <label className="mes-sended" style={{'align-self':'flex-end'}}>
            {message.updatedAt!=message.createdAt && "(Updated)"}{timeformat(message.updatedAt)}
            </label>
        </div>
    </div>
  );
}