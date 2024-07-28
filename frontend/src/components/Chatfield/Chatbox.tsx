import "./Chatbox.css"
import UserType from "../../ws/User"
import MessageComponent from "./message"
import {Message} from "../../ws/Chat"
import {Dispatch, useEffect, useRef, SetStateAction} from "react"
import WS, {Update} from "../../ws/ws"
import { infoLabelShow } from "../../utils/infoLabel"
import MemberList from "../MemberList/MemberList";

interface ChatboxProps {
  user: UserType
  chatIndex: number
  ws: WS
  setSidebarView: Dispatch<SetStateAction<boolean>>
}

export const Chatbox = ({chatIndex, user, ws, setSidebarView}:ChatboxProps) => {
  const chat = user.chats[chatIndex]
  const errorlabelRef = useRef<HTMLLabelElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const callback = (update: Update) => {
    infoLabelShow("Friend added to gc", "green", errorlabelRef)
  }

  const errCallback = (update: Update) => {
    if (update.msg) {
      infoLabelShow(update.msg, "red", errorlabelRef)
    }
  }

  const addFriendToChat = async () => {
    if (!errorlabelRef.current || !inputRef.current) {
      return
    }
    if (!inputRef.current.value) {
      infoLabelShow("Please enter a username", "red", errorlabelRef)
      return
    }
    try {
      ws.send("chat-invite", {username: inputRef.current.value, chatId: user.chats[chatIndex]._id}, callback, errCallback)
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
            <input className="add-user-input" ref={inputRef} placeholder="Add friend to chat" type="text"/>
            <button onClick={() => addFriendToChat()} className="add-button">+</button>
          </div>
          : 
          <div></div>
        }
      </div>
      <div className="chatbox-header-2">
        {chatIndex !== null ? <button className="back-button" onClick={() => setSidebarView(true)}>Back</button> :<div></div>}
        {!user.chats[chatIndex].dm ? <MemberList chat={user.chats[chatIndex]}/> : <div></div>}
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
