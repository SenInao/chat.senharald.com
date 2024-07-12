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
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [chat.messages]);

  return (
    <div className="chatbox">
      <h1>{chat.title}</h1>
      <div className="messages-container">
        {
          chat.messages.map((message: Message) => {
            return <MessageComponent msg={message} user={user}/>
          })
        }
        <div ref={lastMessageRef}></div>
      </div>
    </div>
  )
}
