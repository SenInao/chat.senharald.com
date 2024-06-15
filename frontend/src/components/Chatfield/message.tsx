import { Message } from "../../ws/Chat"

interface MesageProps {
  msg: Message
}

const MessageComponent = ({msg}: MesageProps) => {
  const className = "my-message"

  return (
    <div className={className}>
      <label>03:15</label>
      <label>HeY</label>
    </div>
  )
}

export default MessageComponent
