import React from "react"
import "./Sidebar.css"
import { User } from "./User"

interface User {
  id: String,
  fullname: String,
  username: String,
  email: String,
  profilePicture: String,
  chats: [],
  friends: []
}

interface SidebarProps {
  friends: User[]
}

export const Sidebar = ({friends}: SidebarProps)=> {
  return (
    <div className="sidebar">
      <h2>Friends</h2>
      <div className="friend-list">
        {
          friends.map( friend => {
            return (<User user={friend}/>)
          })
        }
      </div>
    </div>
  )
};
