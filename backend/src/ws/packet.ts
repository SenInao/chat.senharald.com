import WebSocket from "ws"
import mongoose from "mongoose"

export type Connection = {id: mongoose.Types.ObjectId, ws: WebSocket}

export interface Packet {
  id: mongoose.Types.ObjectId,
  action: string,
  payload: any
}

interface Update {
  update: String,
  payload: {}
}

export interface Message {
  chatId: mongoose.Types.ObjectId,
  author: mongoose.Types.ObjectId,
  content: String,
}

export interface Result {
  status: boolean,
  update?: Update,
  msg?: String,
  error?: String,
}
