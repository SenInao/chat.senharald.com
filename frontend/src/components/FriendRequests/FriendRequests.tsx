import { useNavigate } from "react-router-dom"
import User from "../../ws/User"
import "./FriendRequests.css"
import WS from "../../ws/ws"

interface Props {
  user: User
  ws: WS
}

export const FriendRequests = ({user, ws}: Props) => {
  const navigate = useNavigate()

  const handleButtonClick = async (username: String, acceptRequest: boolean) => {
    try {
      ws.send("handle-friend-request", {username: username, acceptRequest: acceptRequest})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="RequestsContainer">
      <h1>Friend Requests</h1>

      <div className="requests-list">

        <ul>
          {user.friendRequests.map((request: User) => {
            return (
              <li key={user.friendRequests.indexOf(request)} className="friend-request">
                <label>{request.username}</label>
                <button onClick={() => handleButtonClick(request.username, true)}>Accept</button>
                <button onClick={() => handleButtonClick(request.username, false)}>Decline</button>
              </li>
            )
          })}
        </ul>
      </div>

      <button onClick={() => navigate("/")}>Back</button>
    </div>
  )
}
