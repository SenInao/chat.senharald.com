import "./Chatmessage.style.css"

interface Props {
  author: string
  timestamp: string
  content: string
}

const Chatmessage : React.FC<Props> = ({author, timestamp, content}) => {
  return (
      <div className="message">
        <div className="message-info">
          <label className="username">{author}</label>
          <label className="timestamp">{timestamp}</label>
        </div>
        <label className="content">{content}</label>
      </div>
  )
}

export default Chatmessage
