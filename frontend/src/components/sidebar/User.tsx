import "./User.css"

interface User {
  id: String,
  fullname: String,
  username: String,
  email: String,
  profilePicture: String,
  chats: [],
  friends: []
}

interface UserProp {
  user: User
}


export const User = ({user}:UserProp, ) => {
  return (
    <div className="user-container">
      <label>{user.username}</label>
    </div>
  )
}
