import "./Sidebar.css"
import { Dispatch, SetStateAction } from "react";
import { Chat } from "../../ws/Chat";
import { ChatComponent } from "./ChatComponent";
import User from "../../ws/User";

interface SidebarProps {
  user: User,
  chatContentSetter: Dispatch<SetStateAction< Chat | null>>
}

export const Sidebar = ({user, chatContentSetter}: SidebarProps)=> {
  return (
    <div className="sidebar">
      <h2>Chats</h2>
      <div className="friend-list">
        {
          user.chats.map( (chat) => {
            return (
              <button key={user.chats.indexOf(chat)}  onClick={() => {chatContentSetter(chat)}}>
                <ChatComponent chat={chat}/>
              </button>
            )
          })
        }
      </div>
    </div>
  )
};
