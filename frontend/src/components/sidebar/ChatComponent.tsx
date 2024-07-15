import "./ChatComponent.css"
import { Chat } from "../../ws/Chat"
import User from "../../ws/User"

interface UserProp {
  chat: Chat,
  user: User,
}

export const ChatComponent = ({chat, user}:UserProp) => {
  var title = chat.title
  if (chat.dm) {
    if (user.username === chat.users[0].username) {
      title = chat.users[1].username
    } else {
      title = chat.users[0].username
    }
  }

  return (
    <div className="chat-container">
      <label>{title}</label>
    </div>
  )
}
