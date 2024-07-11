import WebSocket from "ws"
import createMessage from "./controllers/createMessage"
import register from "./controllers/register"
import mongoose from "mongoose"
import { broadcastToChat } from "../utils/broadcast"

export type Connection = {id: mongoose.Types.ObjectId, ws: WebSocket}

export const actions = {
  "create-message": async (packet:Packet, ws:WebSocket, users: Connection[]) => {
    const message = await createMessage(packet)
    if (message) {
      broadcastToChat(message, users)
    }
  },

  "register": (packet:Packet, ws:WebSocket, users: Connection[]) => {
    register(packet, ws, users)
  }
}

export interface Message {
  chatId: mongoose.Types.ObjectId,
  author: mongoose.Types.ObjectId,
  content: String,
}

export interface Packet {
  id: mongoose.Types.ObjectId,
  action: keyof typeof actions,
  message?: Message
}

interface Update {
  update: String,
  payload: {}
}

export interface Result {
  status: boolean,
  update?: Update,
  msg?: String,
  error?: String,
}
