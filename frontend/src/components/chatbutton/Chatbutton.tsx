import { useContext } from "react"
import { MainWindow } from "../../App"
import { Chat, WsProvider } from "../../context/WsContext"
import ChatComponent from "../chat/Chat"
import NotificationComponent from "../notification/Notification"
import "./Chatbutton.css"

interface Props {
  chat : Chat
  chatname : string
  mainWindow : MainWindow
}

const Chatbutton : React.FC<Props> = ({mainWindow, chat, chatname}) => {
  const context = useContext(WsProvider)
  if (!context) throw new Error("missing context")
  const {setChat, user, ws} = context

  function buttonClick(component: React.ComponentType, title : string) {
    setChat(chat)
    mainWindow.setSidebarVisible(!mainWindow.sidebarVisible)
    mainWindow.setTitle(title)
    mainWindow.setContent(() => component)
    if (ws && ws.state) {
      ws.send("read-chat-messages", {chatId: chat._id})
    }
  }

  function getNotifications() {
    if (!user) return 0
    let i = 0
    chat.messages.forEach(msg => {
      if (!msg.usersRead.includes(user._id)) {
        i+=1
      }
    })
    return i
  }

  return (
    <div className="chatbutton" onClick={() => buttonClick(ChatComponent, chatname)}>
      <label>{chatname}</label>
      <NotificationComponent size={25} notifications={getNotifications()}/>
    </div>
  )
}

export default Chatbutton
