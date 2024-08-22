import { useContext } from "react"
import { User, WsProvider } from "../../context/WsContext"
import "./FriendRequests.css"

const FriendRequests : React.FC = () => {
  const context = useContext(WsProvider)
  if (!context) throw new Error("context missing")
  const {ws, setUser, user} = context

  const handleButtonClick = async (req: User, acceptRequest: boolean) => {
    if (!ws) return
    try {
      const newUser = JSON.parse(JSON.stringify(ws.user))
      newUser.friendRequests.splice(ws.user.friendRequests.indexOf(req),1)
      setUser(newUser)
      ws.send("handle-friend-request", {username: req.username, acceptRequest: acceptRequest})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="friend-requests">
      <ul>
        {user?.friendRequests.map(req => {
          return (
            <li key={user.friendRequests.indexOf(req)}>
              <label>{req.username}</label>
              <button onClick={() => handleButtonClick(req, true)}>Accept</button>
              <button onClick={() => handleButtonClick(req, false)}>Decline</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default FriendRequests
