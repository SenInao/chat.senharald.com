const CONNECTING = 0
const CONNECTED = 1
const ERROR = 2
const CLOSE = 3


class WS {
  url : string
  ws : WebSocket
  state : number

  constructor(url:string) {
    this.url = url
    this.state = CONNECTING
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
      console.log(msg.data)
    }
  }
}

export default WS
