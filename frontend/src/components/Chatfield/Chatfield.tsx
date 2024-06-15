import {useRef, useState} from "react"
import { Chatbox } from "./Chatbox"
import "./Chatfield.css"
import UserType from "../../ws/User"
import { Chat } from "../../ws/Chat"
import WS from "../../ws/ws"
import Result from "../../ws/result"

interface ChatfieldProps {
  user: UserType,
  chatContent: null | Chat
}

export const Chatfield = ({user, chatContent}:ChatfieldProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const logMessage = (result: Result) => {
    console.log(result.msg)
  }

  const SendMessage = () => {
    const ws = new WS("ws://localhost:8080", user.id)
    ws.msgCallback = logMessage

    if (!inputRef.current || !buttonRef.current) {
      return
    }

    if (ws.state === 0) {
      ws.onOpenCallback = () => {
        if (!inputRef.current || !chatContent) {
          return
        }
        ws.send("create-message", {chatId: chatContent.id, author: user.id, content: inputRef.current.value})
      }
    } else {
      if (!chatContent) {
        return
      }
      ws.send("create-message", {chatId: chatContent.id, author: user.id, content: inputRef.current.value})
    }
  }

  if (chatContent === null) {
    return <div>HALGKGJ</div>
  }
 
  return (
    <div className="chatfield">

      <Chatbox user={user} chat={chatContent}/>

      <div className="sending-container">
        <input ref={inputRef} className="chat-input" type="text"/>
        <button ref={buttonRef} className="send-button" onClick={SendMessage}>SEND</button>
      </div>

    </div>
  )
}
