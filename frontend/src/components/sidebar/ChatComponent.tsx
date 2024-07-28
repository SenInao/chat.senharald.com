import "./ChatComponent.css"
import { Chat } from "../../ws/Chat"
import User from "../../ws/User"
import { CgProfile } from "react-icons/cg";
import NotificationComponent from "../Notification/Notification";

interface UserProp {
  chat: Chat
  user: User
}

export const ChatComponent = ({chat, user}:UserProp) => {
  var title = chat.title
  var chatpicture
  var notifications: number = 0

  if (chat.dm) {
    if (user.username === chat.users[0].username) {
      title = chat.users[1].username
      chatpicture = chat.users[1].profilePicture
    } else {
      title = chat.users[0].username
      chatpicture = chat.users[0].profilePicture
    }
  }

  chat.messages.forEach((message) => {
    if (!message.usersRead.includes(user._id)) {
      notifications+=1
    }
  })

  return (
    <div className="chat-container">
      <div className="items-left">
        {chatpicture ? <img className="image" src={chatpicture}/> : <div><CgProfile size={50}/></div>}
        <label>{title}</label>
      </div>
      <NotificationComponent size={30} notifications={notifications}/>
    </div>
  )
}
