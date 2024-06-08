import { Chatbox } from "./Chatbox"
import "./Chatfield.css"

export const Chatfield = () => {
  return (
    <div className="chatfield">
      <Chatbox/>
      <div className="sending-container">
        <input className="chat-input" type="text"/>
        <button className="send-button">SEND</button>
      </div>
    </div>
  )
}
