import { useContext, useEffect, useRef } from "react"
import { WsProvider } from "../../context/WsContext"
import "./Chatinput.style.css"

const Chatinput : React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const context = useContext(WsProvider)
  if (!context) throw new Error("context missing")
  const {ws, chat} = context

  const handleKeyPress = (e:any) => {
    if (e.code === "Enter") {
      SendMessage()
    }
  }

  const SendMessage = () => {
    if (ws && chat && inputRef.current) {
      if (!inputRef.current.value) {
        return
      }
      ws.send("create-message", {chatId: chat._id, author: ws.user._id, content: inputRef.current.value})
      inputRef.current.value = ""
    }
  }

  useEffect(() => {
    const input = inputRef.current
    if (!input)return
    
    const handleFocus = () => {
      setTimeout(() => {
        input.scrollIntoView()
      }, 300)
    }

    input.addEventListener("focus", handleFocus)
    input.addEventListener("blur", () => {window.scrollTo(0,0)})
    return () => {
      input.removeEventListener("focus", handleFocus)
    }
  }, [])
  
  return (
    <div className="chatinput">
      <input ref={inputRef} type={"text"} onKeyDown={handleKeyPress}/>
    </div>
  )
}

export default Chatinput
