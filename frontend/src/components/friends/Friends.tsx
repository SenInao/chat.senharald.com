import {useContext} from "react"
import { WsProvider } from "../../context/WsContext"
import "./Friends.css"

const Friends : React.FC = () => {
  const context = useContext(WsProvider)
  if (!context) throw new Error("context missing")
  const {user} = context
  return (
    <div className="friends">
      <ul>
        {user?.friends.map(friend => {
          return <li key={user.friends.indexOf(friend)}>{friend.username}</li>
        })}
      </ul>
    </div>
  )
}

export default Friends
