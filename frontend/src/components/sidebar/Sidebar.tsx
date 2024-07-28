import "./Sidebar.css"
import { Dispatch, SetStateAction, useEffect, useRef} from "react";
import { ChatComponent } from "./ChatComponent";
import User from "../../ws/User";
import { useNavigate } from "react-router-dom";
import NotificationComponent from "../Notification/Notification";
import WS from "../../ws/ws";

interface SidebarProps {
  ws: WS
  user: User
  setChatIndex: Dispatch<SetStateAction< number | null>>
  sidebarInView: boolean
  setSidebarView: Dispatch<SetStateAction<boolean>>
}

export const Sidebar = ({user, setChatIndex, sidebarInView, setSidebarView, ws}: SidebarProps)=> {
  const navigate = useNavigate()
  const sidebarRef = useRef<HTMLDivElement>(null)

  const changeViewedElement = (chatIndex: number | null) => {
    setChatIndex(chatIndex)
    if (chatIndex !== null) {
      ws.send("read-chat-messages", {chatId: user.chats[chatIndex]._id})
    }
    if (window.innerWidth <= 780) {
      setSidebarView(!sidebarInView)
      return
    }
  }

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle("visible", sidebarInView)
    }
  })

  return (
    <div ref={sidebarRef} className="sidebar">
      <div className="navbar">
        <button className="navbar-button" onClick={() => changeViewedElement(null)}>Friends</button>
        <button className="navbar-button" onClick={() => navigate("/add-friend")}>Add Friend</button>
        <button className="navbar-button" onClick={() => navigate("/pending-requests")}>Friend requests <NotificationComponent size={25} notifications={user.friendRequests.length}/></button>
      </div>

      <div className="chat-list">
        <h3>Direct messages<button className="add-button" onClick={() => navigate("/add-friend")}>+</button></h3>
        {
          user.chats.map((chat) => {
            let chatIndex = user.chats.indexOf(chat)
            if (!chat.dm){
              return <div key={chatIndex}></div>
            }
            return (
              <button key={chatIndex} className="chat-button"  onClick={() => changeViewedElement(chatIndex)}>
                <ChatComponent chat={chat} user={user}/>
              </button>
            )
          })
        }
      </div>

      <div className="chat-list">
        <h3>Group chats <button className="add-button" onClick={() => navigate("/create-gc")}>+</button></h3>
        {
          user.chats.map((chat) => {
            let chatIndex = user.chats.indexOf(chat)
            if (chat.dm){
              return <div key={chatIndex}></div>
            }
            return (
              <button key={chatIndex} className="chat-button"  onClick={() => changeViewedElement(chatIndex)}>
                <ChatComponent chat={chat} user={user}/>
              </button>
            )
          })
        }
      </div>
    </div>
  )
};
