import {useRef} from "react"
import { Chatbox } from "./Chatbox"
import "./Chatfield.css"
import { IoMdSend } from "react-icons/io";
import WS from "../../ws/ws"
import User from "../../ws/User"

interface ChatfieldProps {
  ws: WS | null
  user: User
  chatIndex: number | null,
}

export const Chatfield = ({ws, user, chatIndex}:ChatfieldProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyPress = (e:any) => {
    if (e.code === "Enter") {
      SendMessage()
    }
  }

  const SendMessage = () => {
    if (ws && (chatIndex !== null) && inputRef.current) {
      if (!inputRef.current.value) {
        return
      }
      ws.send("create-message", {chatId: user.chats[chatIndex]._id, author: user.id, content: inputRef.current.value})
      inputRef.current.value = ""
    }
  }

  if (chatIndex === null) {
    return (
      <div className="friends-list">
        <h1>Friends:</h1>
        {
          user.friends.map((friend: User) => {
            return <label key={user.friends.indexOf(friend)} className="friend-name">{friend.username}</label>
          })
        }
      </div>
    )
  }
 
  return (
    <div className="chatfield">
      <Chatbox user={user} chatIndex={chatIndex}/>

      <div className="sending-container">
        <input ref={inputRef} className="chat-input" type="text" onKeyDown={handleKeyPress}/>
        <button ref={buttonRef} className="send-button" onClick={SendMessage}>
          <IoMdSend className="sendimg"/>
        </button>
      </div>

    </div>
  )
}
