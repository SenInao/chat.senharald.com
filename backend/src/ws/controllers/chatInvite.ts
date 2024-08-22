import Chat from "../../models/chat";
import User from "../../models/user";
import { Packet } from "../packet";

async function chatInvite(packet: Packet) {
  if (!packet.payload.username) {
    throw new Error("Username required")
  }

  if (!packet.payload.chatId) {
    throw new Error("chatId required")
  }

  const user = await User.findById(packet.id)
  const invitedUser = await User.findOne({username: packet.payload.username})
  const chat = await Chat.findById(packet.payload.chatId)

  if (!user || !chat) {
    throw new Error("Mongoose error")
  }

  if (!invitedUser) {
    throw new Error("Friend not found")
  }

  if (user.friends.indexOf(invitedUser._id) === -1) {
    throw new Error("Friend not found")
  }

  if (chat.users.indexOf(invitedUser._id) !== -1) {
    throw new Error("Friend already in group")
  }

  if (chat.dm) {
    throw new Error("Chat is a dm")
  }

  chat.users.push(invitedUser._id)
  invitedUser.chats.push(chat._id)

  await chat.save({validateBeforeSave:false})
  await invitedUser.save({validateBeforeSave:false})

  return [user._id, invitedUser._id]
}

export default chatInvite
