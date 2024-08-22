import { useContext, useRef } from "react"
import { WsProvider } from "../../context/WsContext"
import { infoLabelShow } from "../../utils/infolabel"
import { Update } from "../../ws/ws"
import "./GcInfo.style.css"

const GcInfo : React.FC = () => {
  const context = useContext(WsProvider)
  if (!context) throw new Error("context missing")
  const {chat, ws} = context

  const infoRef = useRef<HTMLLabelElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const callback = () => {
    infoLabelShow("Friend added", "green", infoRef)
  }

  const errCallback = (update: Update) => {
    if (update.msg) {
      infoLabelShow(update.msg, "red", infoRef)
    }
  }

  const createGc = async () => {
    if (!inputRef.current || !infoRef.current || !ws || !chat) {
      return
    }
    if (!inputRef.current.value) {
      infoLabelShow("Please enter a username", "red", infoRef)
      return
    }
    try {
      ws.send("chat-invite", {username: inputRef.current.value, chatId: chat._id}, callback, errCallback)
    } catch (error) {
      console.log(error)
      return
    }
    inputRef.current.value = ""
  }

  return (
    <div className="gc-info">
      <h1>Members</h1>
      <ul>
        {chat?.users.map(user => {
          return <li key={chat.users.indexOf(user)}>{user.username}</li>
        })}
      </ul>

      <div>
        <label ref={infoRef} className="info-label">Error</label>
        <div className="input-field">
          <label>Username: </label>
          <input ref={inputRef} type="text"/>
        </div>
        <button className="confirm-button" onClick={() => createGc()}>Add</button>
      </div>
    </div>
  )
}

export default GcInfo
