import Update from "./update"

const CONNECTING = 0
const CONNECTED = 1
const ERROR = 2
const CLOSE = 3


interface Packet {
  id: String,
  action: String,
  payload?: any
}

class WS {
  url : string
  ws : WebSocket
  state : number
  msgCallback : null | ((update: Update) => void)
  onOpenCallback : null | any
  userId: String

  constructor(url:string, userId: String) {
    this.userId = userId
    this.url = url
    this.state = CONNECTING
    this.msgCallback = null
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
        console.log(error)
        console.log(msg.data)
      }
    }
  }

  send(action: String, payload:any) {
    const packet:Packet = {
      id:this.userId,
      action:action,
      payload:payload,
    }

    this.ws.send(JSON.stringify(packet))
  }
}

export default WS
