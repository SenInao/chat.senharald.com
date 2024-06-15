import Result from "./result"

const CONNECTING = 0
const CONNECTED = 1
const ERROR = 2
const CLOSE = 3

interface Message {
  chatId: String,
  author: String,
  content: String,
}

interface Packet {
  id: String,
  action: String,
  message?: Message
}

class WS {
  url : string
  ws : WebSocket
  state : number
  msgCallback : null | ((result:Result) => void)
  onOpenCallback : null | any
  userId: String

  constructor(url:string, userId: String) {
    this.userId = userId
    this.url = url
    this.state = CONNECTING
    this.msgCallback = null
    this.onOpenCallback = null
    this.ws = new WebSocket(url)
    this.connect()
  };

  connect() {
    this.ws = new WebSocket(this.url)

    this.ws.onopen = () => {
      this.state = CONNECTED

      const packet:Packet = {
        id:this.userId,
        action:"register",
      }

      this.ws.send(JSON.stringify(packet))

      if (this.onOpenCallback) {
        this.onOpenCallback()
      }
    }

    this.ws.onerror = () => {
      this.state = ERROR
    }

    this.ws.close = () => {
      this.state = CLOSE
    }

    this.ws.onmessage = (msg) => {
      try {
        const packet = JSON.parse(msg.data)

        if (this.msgCallback) {
          this.msgCallback(packet)
        } else {
          console.log(msg.data)
        }
      } catch (error) {
        console.log(msg.data)
      }
    }
  }

  send(action: String, message: Message | undefined) {
    const packet:Packet = {
      id:this.userId,
      action:action,
      message:message,
    }

    this.ws.send(JSON.stringify(packet))
  }
}

export default WS
