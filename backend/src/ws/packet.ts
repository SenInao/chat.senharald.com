import WebSocket from "ws"
import mongoose from "mongoose"

export type Connection = {id: mongoose.Types.ObjectId, ws: WebSocket}

export interface Packet {
  id: mongoose.Types.ObjectId,
  requestId: number,
  action: string,
  payload?: any
}

export interface Update {
  status: boolean
  id: number
  user?: any
  msg?: string
}

export interface Message {
  chatId: mongoose.Types.ObjectId,
  author: mongoose.Types.ObjectId,
  content: String,
}
