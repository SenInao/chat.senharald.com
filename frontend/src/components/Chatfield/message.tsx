import { Message } from "../../ws/Chat"
import User from "../../ws/User"

interface MesageProps {
  msg: Message
  user: User
}

const MessageComponent = ({msg, user}: MesageProps) => {
  var className
  if (msg.author  === user.id) {
    className = "my-message"
  } else {
    className = "friend-message"
  }

  return (
    <div className={className}>
      <label>3:15</label>
      <label>{msg.content}</label>
    </div>
  )
}

export default MessageComponent
