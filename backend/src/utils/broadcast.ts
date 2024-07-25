import User from "../models/user";
import "../models/chat"
import "../models/message"
import { Connection } from "../ws/packet";
import mongoose from "mongoose";
import findUserIndex from "./findUserIndex";

export async function broadcastToUsers(userIds: mongoose.Types.ObjectId[], connections: Connection[]) {
  userIds.forEach(async (id) => {
    const connectionIndexes = findUserIndex(id, connections)
    if (!connectionIndexes) {
      return
    }

    const user = await User.findById(id)
      .populate({
        path: "friends",
        select: "username profilePicture -_id"
      })
      .populate({
        path: "friendRequests",
        select: "username profilePicture -_id"
      })
      .populate({
        path: "chats",
        populate: [
          {
            path: "messages",
            populate: [
              {
                path: "author",
                select: "username profilePicture -_id"
              }
            ]
          },
          {
            path: "users",
            select: "username profilePicture -_id"
          }
        ]
      }).lean()

    const packet = {
      status: true,
      user: user
    }

    connectionIndexes.forEach((connectionIndex) => {
      connections[connectionIndex].ws.send(JSON.stringify(packet))
    })
  })
}
