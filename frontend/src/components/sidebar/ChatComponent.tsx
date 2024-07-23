import "./ChatComponent.css"
import { Chat } from "../../ws/Chat"
import User from "../../ws/User"
import { CgProfile } from "react-icons/cg";
import { useRef } from "react";

interface UserProp {
  chat: Chat,
  user: User,
}

export const ChatComponent = ({chat, user}:UserProp) => {
  var title = chat.title
  var chatpicture

  if (chat.dm) {
    if (user.username === chat.users[0].username) {
      title = chat.users[1].username
      chatpicture = chat.users[1].profilePicture
    } else {
      title = chat.users[0].username
      chatpicture = chat.users[0].profilePicture
    }
  }

  return (
    <div className="chat-container">
      {chatpicture ? <img className="image" src={chatpicture}/> : <div><CgProfile size={50}/></div>}
      <label>{title}</label>
    </div>
  )
}
