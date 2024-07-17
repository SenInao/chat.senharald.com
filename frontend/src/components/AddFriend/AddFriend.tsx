import { useNavigate } from "react-router-dom"
import {useRef} from "react"
import "./AddFriend.css"
import axios from "axios"

export const AddFriend = () => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const infoRef = useRef<HTMLLabelElement>(null)

  const sendFriendRequest = async () => {
    if (!inputRef.current || !infoRef.current) {
      return
    }

    if (!inputRef.current.value) {
      infoRef.current.innerText = "Please provide a username"
      infoRef.current.style.display = "block"
    }

    infoRef.current.style.display = "none"
    try {
      const response = await axios.post("http://senharald.com/api/user/send-friend-request/", {username: inputRef.current.value}, {
        withCredentials:true
      })

      infoRef.current.style.display = "block"

      if (response.data.status) {
        infoRef.current.style.color = "green"
        infoRef.current.innerText = "Friend request sent!"
      } else {
        infoRef.current.style.color = "red"
        infoRef.current.innerText = response.data.message
      }

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
