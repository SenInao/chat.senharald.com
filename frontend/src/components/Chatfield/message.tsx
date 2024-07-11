import { Message } from "../../ws/Chat"

interface MesageProps {
  msg: Message
}

const MessageComponent = ({msg}: MesageProps) => {
  const className = "my-message"

  return (
    <div className={className}>
      <label>3:15</label>
      <label>{msg.content}</label>
    </div>
  )
}

export default MessageComponent
