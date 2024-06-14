import {useRef} from "react"
import { Chatbox } from "./Chatbox"
import "./Chatfield.css"
import UserType from "../../ws/User"
import WS from "../../ws/ws"
import Result from "../../ws/result"

interface ChatfieldProps {
  user: UserType
}

export const Chatfield = ({user}:ChatfieldProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const logMessage = (result: Result) => {
    console.log(result.msg)
  }

  const SendMessage = () => {
    const ws = new WS("ws://localhost:8080")
    ws.msgCallback = logMessage

    if (!inputRef.current || !buttonRef.current) {
      return
    }

    if (ws.state === 0) {
      ws.ws.onopen = () => {
        if (!inputRef.current) {
          return
        }
        ws.send(user.id, "create-message", {receiver: "Mike Tyson", content:inputRef.current.value})
      }
    } else {
      ws.send(user.id, "create-message", {receiver: "Mike Tyson", content:inputRef.current.value})
    }
  }

  return (
    <div className="chatfield">

      <Chatbox user={user}/>

      <div className="sending-container">
        <input ref={inputRef} className="chat-input" type="text"/>
        <button ref={buttonRef} className="send-button" onClick={SendMessage}>SEND</button>
      </div>

    </div>
  )
}
