import Result from "./result"

const CONNECTING = 0
const CONNECTED = 1
const ERROR = 2
const CLOSE = 3

interface Packet {
  id: String,
  action: String,
  payload: {}
}

class WS {
  url : string
  ws : WebSocket
  state : number
  msgCallback : null | ((result:Result) => void)

  constructor(url:string) {
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

  send(userId: String, action: String, payload: {}) {
    const packet:Packet = {
      id:userId,
      action:action,
      payload:payload
    }

    this.ws.send(JSON.stringify(packet))
  }
}

export default WS
