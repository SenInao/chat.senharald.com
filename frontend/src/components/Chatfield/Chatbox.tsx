import "./Chatbox.css"
import UserType from "../../ws/User"
import MessageComponent from "./message"
import {Chat, Message} from "../../ws/Chat"
import {useEffect, useRef} from "react"

interface ChatboxProps {
  user: UserType,
  chat: Chat
}

export const Chatbox = ({chat, user}:ChatboxProps) => {
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
      <h1>{title}</h1>
      <div className="messages-container">
        {
          chat.messages.map((message: Message) => {
            if (message) {
              return <MessageComponent key={chat.messages.indexOf(message)} msg={message} user={user}/>
            }
          })
        }
        <div className="lastelement" ref={lastMessageRef}> </div>
      </div>
    </div>
  )
}
