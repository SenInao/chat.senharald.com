import "./Chatbox.css"
import UserType from "../../ws/User"
import { useEffect } from "react"
import WS from "../../ws/ws"
import Result from "../../ws/result"
import MessageComponent from "./message"
import {Chat, Message} from "../../ws/Chat"

interface ChatboxProps {
  user: UserType,
  chat: Chat
}

const handleNewMessage = (result:Result) => {
  if (result.update) {
    if (result.update.update === "new-message") {
      console.log(result)
    }
  }
}

export const Chatbox = ({user, chat}:ChatboxProps) => {
  useEffect(() => {
    const ws = new WS("ws://localhost:8080", user.id)

    ws.msgCallback = handleNewMessage
  }, [])


  return (
    <div className="chatbox">
      <h1>{chat.title}</h1>
      <div className="messages-container">
        {
          chat.messages.map((message: Message) => {
            return <MessageComponent msg={message}/>
          })
        }
      </div>
    </div>
  )
}
