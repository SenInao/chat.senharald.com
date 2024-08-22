import Chatcontent from "./Chatcontent"
import Chatinput from "./Chatinput"
import "./Chat.style.css"

const Chat : React.FC = () => {
  return (
    <div className="chat">
      <Chatcontent/>
      <Chatinput/>
    </div>
  )
}

export default Chat
