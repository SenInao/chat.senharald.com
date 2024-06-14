import "./User.css"
import UserType from "../../ws/User"

interface UserProp {
  user: UserType
}

export const User = ({user}:UserProp, ) => {
  return (
    <div className="user-container">
      <label>{user.username}</label>
    </div>
  )
}
