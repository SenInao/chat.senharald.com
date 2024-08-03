import { generateId } from "../utils/gernerateId"
import User from "./User"

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
  msgCallback : null | ((update: Update) => void)
  onOpenCallback : null | any
  userId: String
  pendingRequests: wsRequest[]

  constructor(url:string, userId: String) {
    this.userId = userId
    this.url = url
    this.state = CONNECTING
    this.msgCallback = null
    this.ws = new WebSocket(url)
    this.pendingRequests = []
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
          if (this.msgCallback) {
            this.msgCallback(update)
          }
          return
        }

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
      } catch (error) {
        console.log(error)
        console.log(msg.data)
      }
    }
  }

  send(action: String, payload:any=null, callback:UpdateCallback=()=>{}, errorCallback:UpdateCallback=()=>{}) {
    const requestID = generateId(this.pendingRequests)

    const request:wsRequest = {
      id: requestID,
      callback: callback, 
      errorCallback: errorCallback,
      resolved: false
    }

    const packet:Packet = {
      id:this.userId,
      requestId: requestID,
      action:action,
      payload:payload,
    }

    this.pendingRequests.push(request)

    this.ws.send(JSON.stringify(packet))
  }
}

export default WS
