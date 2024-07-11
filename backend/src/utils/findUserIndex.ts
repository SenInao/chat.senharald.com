import mongoose from "mongoose"
import { Connection } from "../ws/packet"

export default function findUserIndex(id: mongoose.Types.ObjectId, users: Connection[]) {
  const connections = []
  for (let i = 0; i < users.length; i++) {
    if (id.equals(users[i].id)) {
      connections.push(i)
    }
  }
  return connections
}
