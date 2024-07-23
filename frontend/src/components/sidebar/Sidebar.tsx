import "./Sidebar.css"
import { Dispatch, SetStateAction } from "react";
import { Chat } from "../../ws/Chat";
import { ChatComponent } from "./ChatComponent";
import User from "../../ws/User";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  user: User,
  chatContentSetter: Dispatch<SetStateAction< Chat | null>>
}

export const Sidebar = ({user, chatContentSetter}: SidebarProps)=> {
  const navigate = useNavigate()
  return (
    <div className="sidebar">
      <div className="navbar">
        <button className="navbar-button" onClick={() => chatContentSetter(null)}>Friends</button>
        <button className="navbar-button" onClick={() => navigate("/add-friend")}>Add Friend</button>
        <button className="navbar-button" onClick={() => navigate("/pending-requests")}>Friend requests</button>
      </div>
      <div className="chat-list">
        <h3>Direct messages<button className="add-button" onClick={() => navigate("/add-friend")}>+</button></h3>
        {
          user.chats.map((chat) => {
            if (!chat.dm){
              return
            }
            return (
              <button key={user.chats.indexOf(chat)} className="chat-button"  onClick={() => {chatContentSetter(chat)}}>
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
            if (chat.dm){
              return
            }
            return (
              <button key={user.chats.indexOf(chat)} className="chat-button"  onClick={() => {chatContentSetter(chat)}}>
                <ChatComponent chat={chat} user={user}/>
              </button>
            )
          })
        }
      </div>
    </div>
  )
};
