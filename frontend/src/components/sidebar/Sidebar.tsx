import "./Sidebar.css"
import { User } from "./User"
import UserType from "../../ws/User"

interface SidebarProps {
  friends: UserType[]
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
