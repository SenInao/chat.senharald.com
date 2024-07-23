import axios from "axios"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./CreateGC.css"

export const CreateGC = () => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const errorRef = useRef<HTMLLabelElement>(null)

  const createGc = async () => {
    if (!inputRef.current || !errorRef.current || !buttonRef.current) {
      return
    }

    if (!inputRef.current.value) {
      errorRef.current.style.display = "block"
      errorRef.current.style.color = "red"
      errorRef.current.innerText = "Please enter a name"
      return
    }
    buttonRef.current.style.display = "none"
    errorRef.current.style.display = "none"

    try {
      const response = await axios.post("http://localhost:80/api/chat/create-chat", {title:inputRef.current.value}, {withCredentials:true})

      if (!response.data.status) {
        console.log(response.data.message)
        return
      }

      errorRef.current.style.display = "block"
      errorRef.current.style.color = "green"
      errorRef.current.innerText = "Success! New gc created"
    } catch (error) {
      console.log(error)
      return
    }
    inputRef.current.value = ""
    buttonRef.current.style.display = "block"
  }

  return (
  <div className="creategc-container">
      <h1>CrateGC</h1>
      <div className="input-field">
        <label className="error" ref={errorRef}>error</label>
        <div>
          <label>Name</label>
          <input ref={inputRef} type="text"/>
        </div>
        <button ref={buttonRef} onClick={() => createGc()}>Create</button>
      </div>
      <button onClick={() => navigate("/")}>Back</button>
  </div>
  )
}
