import { useContext, useEffect, useRef } from "react"
import { WsProvider } from "../../context/WsContext"
import "./Chatcontent.style.css"
import Chatmessage from "./Chatmessage"

const Chatcontent : React.FC = () => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const context = useContext(WsProvider)
  if (!context) throw new Error("context missing")
  const {chat} = context

  useEffect(() => {
    const element = bottomRef.current
    if (!element) return
    element.scrollIntoView()
    window.scrollTo(0,0)
  }, [chat])

  function formatTime(timestamp: string) {
    const date = new Date(Date.parse(timestamp))
    return date.toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric"}) + " | " + date.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})
  } 

  if (!chat) {
    return <div></div>
  }

  return (
    <div className="chat-content">
      {chat.messages.map(message => {
        return <Chatmessage key={chat.messages.indexOf(message)} author={message.author.username} timestamp={formatTime(message.createdAt)} content={message.content
        }/>
      })}
      <div ref={bottomRef} className="bottom-element"></div>
    </div>
  )
}

export default Chatcontent
