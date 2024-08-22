import { User } from "../context/WsContext"

const CONNECTING = 0
const CONNECTED = 1
const ERROR = 2
const CLOSE = 3

export interface Update{
  status: boolean,
  id: number,
  user?: User,
  msg?: string
}

export interface wsRequest {
  id : number,
  callback : UpdateCallback
  errorCallback : UpdateCallback
  resolved: boolean
}

type UpdateCallback = (update:Update) => any

interface Packet {
  id: String,
  requestId: number,
  action: String,
  payload?: any
}

class WS {
  url : string
  ws : WebSocket
  state : number
  onOpenCallback : null | any
  pendingRequests: wsRequest[]
  user: User
  setUser : (user:User) => void

  constructor(url:string, user: User, setUser:(user:User) => void) {
    this.user = user
    this.setUser = setUser
    this.url = url
    this.state = CONNECTING
    this.pendingRequests = []
    this.ws = new WebSocket(url)
    this.connect()
  };

  connect() {
    this.ws.onopen = () => {
      this.state = CONNECTED
      this.send("register")
    }

    this.ws.onerror = () => {
      this.state = ERROR
    }

    this.ws.close = () => {
      this.state = CLOSE
    }

    this.ws.onmessage = (msg) => {
      try {
        const update: Update = JSON.parse(msg.data)

        if (update.id === 0) {
          this.msgCallback(update)
          return
        }
        this.resolveUpdate(update)
      } catch (error) {
        console.log(error)
        console.log(msg.data)
      }
    }
  }

  resolveUpdate(update: Update) {
    const newPendingRequests = [...this.pendingRequests]

    this.pendingRequests.forEach((request: wsRequest) => {
      if (request.id === update.id) {
        if (update.status) {
          request.callback(update)
        } else {
          request.errorCallback(update)
        }
        newPendingRequests.splice(newPendingRequests.indexOf(request), 1)
      }
    })
    this.pendingRequests = newPendingRequests
  }

  generateId() {
    let id = 0
    for (let i = 0; i < this.pendingRequests.length; i++) {
      if (id === this.pendingRequests[i].id) {
        id++
      }
    }
    return id
  }

  msgCallback(update: Update) {
    if (update.status && update.user) {
      this.setUser(update.user)
    }
  }

  send(action: String, payload:any=null, callback:UpdateCallback=()=>{}, errorCallback:UpdateCallback=()=>{}) {
    const requestID = this.generateId()

    const request:wsRequest = {
      id: requestID,
      callback: callback, 
      errorCallback: errorCallback,
      resolved: false
    }

    const packet:Packet = {
      id:this.user._id,
      requestId: requestID,
      action:action,
      payload:payload,
    }

    this.pendingRequests.push(request)

    this.ws.send(JSON.stringify(packet))
  }
}

export default WS
