import mongoose from "mongoose"
import { Connection } from "../ws/packet"

export default function findUserIndex(id: mongoose.Types.ObjectId, users: Connection[]) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      return i
    }
  }

  return false
}
