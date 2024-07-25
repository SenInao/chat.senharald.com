import "./Chatbox.css"
import UserType from "../../ws/User"
import MessageComponent from "./message"
import {Message} from "../../ws/Chat"
import {useEffect, useRef} from "react"
import axios from "axios"

interface ChatboxProps {
  user: UserType,
  chatIndex: number
}

export const Chatbox = ({chatIndex, user}:ChatboxProps) => {
  const chat = user.chats[chatIndex]
  const errorlabelRef = useRef<HTMLLabelElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFriendToChat = async () => {
    if (!errorlabelRef.current || !inputRef.current) {
      return
    }
    if (!inputRef.current.value) {
      errorlabelRef.current.style.display = "block"
      errorlabelRef.current.style.color = "red"
      errorlabelRef.current.innerText = "please enter username"
      return
    }
    try {
      errorlabelRef.current.style.display = "none"
      const response = await axios.post("http://localhost:80/api/chat/add-friend-to-chat", {friend: {username: inputRef.current.value}, chatId: chat._id}, {withCredentials: true})
      errorlabelRef.current.style.display = "block"
      if (!response.data.status) {
        errorlabelRef.current.style.color = "red"
        errorlabelRef.current.innerText = response.data.message
        return
      }
      errorlabelRef.current.style.display = "block"
      errorlabelRef.current.style.color = "green"
      errorlabelRef.current.innerText = "Added friend to chat"

      inputRef.current.value = ""
    } catch (error) {
      console.log(error)
      return
    }
  }

  var title = chat.title
  if (chat.dm) {
    if (user.username === chat.users[0].username) {
      title = chat.users[1].username
    } else {
      title = chat.users[0].username
    }
  }

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [chat.messages]);

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <h1>{title}</h1>
        {!chat.dm ? 
          <div>
            <label ref={errorlabelRef} className="error-label">error</label>
            <input ref={inputRef} placeholder="Add friend" type="text"/>
            <button onClick={() => addFriendToChat()} className="add-button">+</button>
          </div>
          : 
          <div></div>
        }
      </div>
      <div className="messages-container">
        {
          chat.messages.map((message: Message) => {
            return <MessageComponent key={chat.messages.indexOf(message)} msg={message} user={user}/>
          })
        }
        <div className="lastelement" ref={lastMessageRef}> </div>
      </div>
    </div>
  )
}
