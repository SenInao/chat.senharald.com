import WebSocket from "ws";
import {Packet, actions} from "./packet";

function handler(packet: Packet, ws:WebSocket) {
  const action = actions[packet.action]

  if (!action) {
    throw new Error(`Unkown action ${packet.action}`)
  }

  action(packet, ws)
}

export default handler
