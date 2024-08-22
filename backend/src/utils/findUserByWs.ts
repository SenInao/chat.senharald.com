import { WebSocket } from "ws";
import { Connection } from "../ws/packet"

export default function findUserByWs(ws: WebSocket, users: Connection[]) {
  for (let i = 0; i < users.length; i++)  {
    if (users[i].ws === ws) {
      return i
    }
  }
  
  return false
}
