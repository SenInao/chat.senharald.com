import User from "../models/user";
import { Connection, Message } from "../ws/packet";
import findUserIndex from "./findUserIndex";
import mongoose from "mongoose"

export async function broadcastTofriends(senderId: mongoose.Types.ObjectId, message: Message, users: Connection[]) {
  try {
    const sender = await User.findById(senderId)

    if (!sender) {
      throw new Error("User not found")
    }

    sender.friends.forEach((friend) => {
      const i = findUserIndex(friend, users)

      if (!i) {
        return
      }

      users[i].ws.send(JSON.stringify(message))
    })


  } catch (error) {
    console.log(error)
    throw error
  }
}
