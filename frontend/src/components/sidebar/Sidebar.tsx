import React from "react"
import "./Sidebar.css"
import { User } from "./User"

interface SidebarProps {
  friends: string[]
}

export const Sidebar = ({friends}: SidebarProps)=> {
  return (
    <div className="sidebar">
      <h2>Friends</h2>
      <div className="friend-list">
        {
          friends.map( friend => {
            return (<User name={friend}/>)
          })
        }
      </div>
    </div>
  )
};
