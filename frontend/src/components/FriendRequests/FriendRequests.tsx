import axios from "axios"
import { useNavigate } from "react-router-dom"
import { getUser } from "../../utils/getUser"
import User from "../../ws/User"
import "./FriendRequests.css"
import { Dispatch, SetStateAction } from "react"

interface Props {
  user: User
  setUser : Dispatch<SetStateAction< User| null>>
}

export const FriendRequests = ({user, setUser}: Props) => {
  const navigate = useNavigate()

  const handleButtonClick = async (username: String, action: String) => {
    try {
      const response = await axios.post(`http://senharald.com/api/user/${action}-friend-request`, {username: username}, {withCredentials: true})

      if (response.data.status) {
        const newUser = await getUser()
        if (newUser) {
          setUser(newUser)
        }
      } else {
        console.log(response.data.message)
      }

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
                <button onClick={() => handleButtonClick(request.username, "accept")}>Accept</button>
                <button onClick={() => handleButtonClick(request.username, "decline")}>Decline</button>
              </li>
            )
          })}
        </ul>
      </div>

      <button onClick={() => navigate("/")}>Back</button>
    </div>
  )
}
