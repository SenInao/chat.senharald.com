import "./Sidebar.css"
import { Dispatch, SetStateAction} from "react";
import { ChatComponent } from "./ChatComponent";
import User from "../../ws/User";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  user: User,
  setChatIndex: Dispatch<SetStateAction< number | null>>
}

export const Sidebar = ({user, setChatIndex}: SidebarProps)=> {
  const navigate = useNavigate()

  return (
    <div className="sidebar">

      <div className="navbar">
        <button className="navbar-button" onClick={() => setChatIndex(null)}>Friends</button>
        <button className="navbar-button" onClick={() => navigate("/add-friend")}>Add Friend</button>
        <button className="navbar-button" onClick={() => navigate("/pending-requests")}>Friend requests</button>
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
              <button key={chatIndex} className="chat-button"  onClick={() => {setChatIndex(chatIndex)}}>
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
              <button key={chatIndex} className="chat-button"  onClick={() => {setChatIndex(chatIndex)}}>
                <ChatComponent chat={chat} user={user}/>
              </button>
            )
          })
        }
      </div>
    </div>
  )
};
