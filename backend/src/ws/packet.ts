import WebSocket from "ws"
import createMessage from "./controllers/createMessage"
import register from "./controllers/register"
import mongoose from "mongoose"
import { broadcastTofriends } from "../utils/broadcast"

export type Connection = {id: mongoose.Types.ObjectId, ws: WebSocket}

export const actions = {
  "create-message": async (packet:Packet, ws:WebSocket, users: Connection[]) => {
    const message = await createMessage(packet)

    if (message) {
      broadcastTofriends(packet.id, message, users)
    }
  },

  "register": (packet:Packet, ws:WebSocket, users: Connection[]) => {
    register(packet, ws, users)
  }
}

export interface Message {
  receiver: String,
  content: String,
}

export interface Packet {
  id: mongoose.Types.ObjectId,
  action: keyof typeof actions,
  message?: Message
}
