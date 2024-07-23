import {useRef, useState, SetStateAction, Dispatch} from "react"
import { Chatbox } from "./Chatbox"
import "./Chatfield.css"
import UserType from "../../ws/User"
import { Chat } from "../../ws/Chat"
import WS from "../../ws/ws"
import Result from "../../ws/result"
import { getUser } from "../../utils/getUser"
import { IoMdSend } from "react-icons/io";
import {useEffect} from "react"

interface ChatfieldProps {
  user: UserType,
  chatContent: null | Chat,
  setUser : Dispatch<SetStateAction< UserType | null>>
  chatContentSetter : Dispatch<SetStateAction< Chat | null>>
}


export const Chatfield = ({user, chatContent, setUser, chatContentSetter}:ChatfieldProps) => {

  useEffect(() => {
    getUser().then((user) => {
      if (!user || !chatContent) {
        return false
      }
      setUser(user)
      user.chats.forEach((chat:Chat) => {
        if (chat._id === chatContent._id) {
          if (chat.messages.length != chatContent.messages.length) {
            chatContentSetter(chat)
          }
        }
      })
    })
  })

  const buttonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const SendMessage = () => {
    const ws = new WS("ws://chat.senharald.com/ws", user.id)

    if (!inputRef.current || !buttonRef.current) {
      return
    }

    if (ws.state === 0) {
      ws.onOpenCallback = () => {
        if (!inputRef.current || !chatContent) {
          return
        }
        ws.send("create-message", {chatId: chatContent._id, author: user.id, content: inputRef.current.value})
        inputRef.current.value = ""
      }
    } else {
      if (!chatContent) {
        return
      }
      ws.send("create-message", {chatId: chatContent._id, author: user.id, content: inputRef.current.value})
      inputRef.current.value = ""
    }
  }

  if (chatContent === null) {
    return (
      <div className="friends-list">
        <h1>Friends:</h1>
        {
          user.friends.map((friend: UserType) => {
            return <label key={user.friends.indexOf(friend)} className="friend-name">{friend.username}</label>
          })
        }
      </div>
    )
  }
 
  return (
    <div className="chatfield">
      <Chatbox user={user} chat={chatContent}/>

      <div className="sending-container">
        <input ref={inputRef} className="chat-input" type="text"/>
        <button ref={buttonRef} className="send-button" onClick={SendMessage}>
          <IoMdSend className="sendimg"/>
        </button>
      </div>

    </div>
  )
}
