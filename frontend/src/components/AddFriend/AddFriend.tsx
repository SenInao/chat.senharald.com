import { useNavigate } from "react-router-dom"
import {useRef} from "react"
import "./AddFriend.css"
import WS, {Update} from "../../ws/ws"
import { infoLabelShow } from "../../utils/infoLabel"

interface Props {
  ws: WS
}

export const AddFriend = ({ws}:Props) => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const infoRef = useRef<HTMLLabelElement>(null)

  const callback = (update:Update) => {
    infoLabelShow("Friend request sent", "green", infoRef)
  }

  const errCallback = (update:Update) => {
    if (update.msg) {
      infoLabelShow(update.msg, "red", infoRef)
    }
  }

  const sendFriendRequest = async () => {
    if (!inputRef.current || !infoRef.current) {
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
  <div className="AddFriend">
      <h1>Add friend</h1>
      <label id="info-label" ref={infoRef}>Info label</label>
      <div>
        <label>Username: </label>
        <input ref={inputRef} type="text"/>
      </div>
      <button onClick={() => sendFriendRequest()}>Send request</button>
      <button onClick={() => navigate("/")}>Back</button>
  </div>)
}
