import "./Chatfield.css"

export const Chatfield = () => {
  return (
    <div className="chatfield">
      <div className="chatbox">
        <h1>"FRIEND NAME"</h1>
      </div>
      <div className="sending-container">
        <input className="chat-input" type="text"/>
        <button className="send-button">SEND</button>
      </div>
    </div>
  )
}
