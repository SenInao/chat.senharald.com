import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { infoLabelShow } from "../../utils/infoLabel"
import WS, { Update } from "../../ws/ws"
import "./CreateGC.css"

interface Props {
  ws: WS
}

export const CreateGC = ({ws}:Props) => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const errorRef = useRef<HTMLLabelElement>(null)

  const callback = (update: Update) => {
    infoLabelShow("New gc created", "green", errorRef)
  }

  const errCallback = (update: Update) => {
    if (update.msg) {
      infoLabelShow(update.msg, "red", errorRef)
    }
  }

  const createGc = async () => {
    if (!inputRef.current || !errorRef.current || !buttonRef.current) {
      return
    }
    if (!inputRef.current.value) {
      infoLabelShow("Name required", "red", errorRef)
      return
    }
    buttonRef.current.style.display = "none"
    try {
      ws.send("create-gc", {title: inputRef.current.value}, callback, errCallback)
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
