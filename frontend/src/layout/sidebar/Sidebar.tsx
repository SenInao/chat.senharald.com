import { useContext } from "react"
import { MainWindow } from "../../App"
import AddFriend from "../../components/addFriend/AddFriend"
import Chatbutton from "../../components/chatbutton/Chatbutton"
import CreateGc from "../../components/createGc/CreateGc"
import FriendRequests from "../../components/friendRequests/FriendRequests"
import Friends from "../../components/friends/Friends"
import NotificationComponent from "../../components/notification/Notification"
import { Chat, WsProvider } from "../../context/WsContext"
import "./Sidebar.css"

interface Props {
  mainWindow : MainWindow
}

const Sidebar: React.FC<Props> = ({mainWindow}) => {
  const context = useContext(WsProvider)
  if (!context) throw new Error("context missing")
  const {setChat, user} = context

  function buttonClick(component: React.ComponentType, title : string) {
    setChat(null)
    mainWindow.setSidebarVisible(!mainWindow.sidebarVisible)
    mainWindow.setTitle(title)
    mainWindow.setContent(() => component)
  }

  function getTitle(chat: Chat) {
    if (!user) return ""

    if (user.username === chat.users[0].username) {
      return chat.users[1].username
    }
    return chat.users[0].username
  }

  if (!user) return <div></div>

  return (
    <div className="sidebar">
      <section className="sidebar-actions">
        <button className="action-button" onClick={() => buttonClick(FriendRequests, "Friend Requests")}>
          <label>Friend Requests</label>
          <NotificationComponent size={25} notifications={user.friendRequests.length}/>
        </button>
        <button className="action-button" onClick={() => buttonClick(AddFriend, "Add Friend")}>Add Friend</button>
        <button className="action-button" onClick={() => buttonClick(Friends, "Friends")}>Friends</button>
        <button className="action-button" onClick={() => buttonClick(CreateGc, "Create Group Chat")}>Create group chat</button>
      </section>
      <section className="sidebar-dms">
        <h1>Direct messages</h1>
        {user.chats.map(chat => {
          if (!chat.dm) return null
          return <Chatbutton key={user.chats.indexOf(chat)} chat={chat} chatname={getTitle(chat)} mainWindow={mainWindow}/>
        })}
      </section>
      <section className="sidebar-gcs">
        <h1>Group chats</h1>
        {user.chats.map(chat => {
          if (chat.dm) return null
          return <Chatbutton key={user.chats.indexOf(chat)} chat={chat} chatname={chat.title} mainWindow={mainWindow}/>
        })}
      </section>
    </div>
  )
}

export default Sidebar
