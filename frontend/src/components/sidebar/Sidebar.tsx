import React from "react"
import "./Sidebar.css"
import { User } from "./User"

export const Sidebar = () => {
  const friends = [<User name="james"/>, <User name="ben"/>]

  return (
    <div className="sidebar">
      <h2>Friends</h2>
      <div className="friend-list">
        {
          friends.map( friend => {
            return (<div>{friend}</div>)
          })
        }
      </div>
    </div>
  )
};
