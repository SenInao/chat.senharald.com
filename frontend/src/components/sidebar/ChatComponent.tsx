import "./ChatComponent.css"
import { Chat } from "../../ws/Chat"

interface UserProp {
  chat: Chat,
}

export const ChatComponent = ({chat}:UserProp) => {
  return (
    <div className="user-container">
      <label>{chat.title}</label>
    </div>
  )
}
