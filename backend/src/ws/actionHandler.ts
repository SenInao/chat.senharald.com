import WebSocket from "ws";
import {Connection, Packet} from "./packet";
import register from "./controllers/register";
import createMessage from "./controllers/createMessage";
import { broadcastToUsers } from "../utils/broadcast";

async function handler(packet: Packet, ws:WebSocket, connections: Connection[]) {
  if (packet.action === "create-message") {
    const users = await createMessage(packet)
    if (!users) {
      return
    }
    broadcastToUsers(users, connections)

  } else if (packet.action === "register") {
    register(packet, ws, connections)
  }
}

export default handler
