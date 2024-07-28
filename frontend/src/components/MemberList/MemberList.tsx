import { Chat } from "../../ws/Chat"
import "./MemberList.css"

interface Props {
  chat: Chat
}

const MemberList = ({chat}:Props) => {
  return (
    <div className="member-list">
      <h3>Chat members</h3>
      <ul>
        {
          chat.users.map((user) => {
            return (<li key={chat.users.indexOf(user)}>{user.username}</li>)
          })
        }
      </ul>
    </div>
  )
}

export default MemberList
