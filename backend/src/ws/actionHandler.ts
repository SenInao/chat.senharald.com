import WebSocket from "ws";
import {Connection, Packet, actions} from "./packet";

function handler(packet: Packet, ws:WebSocket, users: Connection[]) {
  const action = actions[packet.action]

  if (!action) {
    throw new Error(`Unkown action ${packet.action}`)
  }

  action(packet, ws, users)
}

export default handler
