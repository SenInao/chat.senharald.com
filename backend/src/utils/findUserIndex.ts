import mongoose from "mongoose"
import { Connection } from "../ws/packet"

export default function findUserIndex(id: mongoose.Types.ObjectId, users: Connection[]) {
  const connections = []
  for (let i = 0; i < users.length; i++) {
    if (users[i].id.equals(id)) {
      connections.push(i)
    }
  }
  return connections
}
