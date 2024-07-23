import { Message } from "../../ws/Chat"
import User from "../../ws/User"
import "./message.css"

interface MesageProps {
  msg: Message
  user: User
}

const MessageComponent = ({msg, user}: MesageProps) => {
  var className
  if (msg.author.username  === user.username) {
    className = "my-message"
  } else {
    className = "friend-message"
  }

  return (
    <div className={className}>
      <label className="username">{msg.author.username}</label>
      <div className="message-content">
        <label className="date">{msg.createdAt.split("T")[0]}</label>
        <label>{msg.content}</label>
      </div>
    </div>
  )
}

export default MessageComponent
