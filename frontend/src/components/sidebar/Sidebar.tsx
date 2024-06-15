import "./Sidebar.css"
import { Dispatch, SetStateAction } from "react";
import { Chat } from "../../ws/Chat";
import { ChatComponent } from "./ChatComponent";

interface SidebarProps {
  chats: Chat[],
  chatContentSetter: Dispatch<SetStateAction< Chat | null>>
}

export const Sidebar = ({chats, chatContentSetter}: SidebarProps)=> {
  return (
    <div className="sidebar">
      <h2>Chats</h2>
      <div className="friend-list">
        {
          chats.map( (chat) => {
            return (
              <button key={chats.indexOf(chat)}  onClick={() => {chatContentSetter(chat)}}>
                <ChatComponent chat={chat}/>
              </button>
            )
          })
        }
      </div>
    </div>
  )
};
