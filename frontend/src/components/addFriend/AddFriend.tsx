import { useContext, useRef } from "react"
import { WsProvider } from "../../context/WsContext"
import { infoLabelShow } from "../../utils/infolabel"
import { Update } from "../../ws/ws"
import "./AddFriend.css"

const AddFriend : React.FC = () => {
  const context = useContext(WsProvider)
  if (!context) throw new Error("context missing")
  const {ws} = context

  const infoRef = useRef<HTMLLabelElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const callback = () => {
    infoLabelShow("Friend request sent", "green", infoRef)
  }

  const errCallback = (update:Update) => {
    if (update.msg) {
      infoLabelShow(update.msg, "red", infoRef)
    }
  }

  const sendFriendRequest = async () => {
    if (!inputRef.current || !infoRef.current || !ws) {
      return
    }

    if (!inputRef.current.value) {
      infoLabelShow("Please enter a username", "red", infoRef)
      return
    }

    try {
      ws.send("add-friend", {username: inputRef.current.value}, callback, errCallback)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="add-friend">
      <label ref={infoRef} className="info-label">Error</label>
      <div className="input-field">
        <label>Username: </label>
        <input ref={inputRef} type="text"/>
      </div>
      <button className="confirm-button" onClick={() => sendFriendRequest()}>Add</button>
    </div>
  )
}

export default AddFriend
