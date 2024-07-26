import { WebSocket } from "ws";
import { Packet, Connection} from "../packet";
import User from "../../models/user";

export default async function register(packet:Packet, ws:WebSocket, users: Connection[]) {
  const user = await User.findById(packet.id)
  if (!user) {
    return
  }
  const connection: Connection = {
    id: user._id,
    ws: ws,
  }

  users.push(connection)
}
