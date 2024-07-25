import { WebSocket } from "ws";
import { Packet, Connection} from "../packet";

export default function register(packet:Packet, ws:WebSocket, users: Connection[]) {
  const connection: Connection = {
    id: packet.id,
    ws: ws,
  }

  users.push(connection)
}
