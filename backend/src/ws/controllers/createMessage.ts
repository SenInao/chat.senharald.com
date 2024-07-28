import Chat from "../../models/chat";
import Message from "../../models/message";
import User from "../../models/user";
import { Packet } from "../packet";

async function createMessage(packet: Packet) {
  if (!packet.payload.chatId) {
    throw new Error("ChatId required")
  }

  if (!packet.payload.content) {
    throw new Error("Content required")
  }

  const user = await User.findById(packet.id)
  if (!user) {
    throw new Error("User not found")
  }

  const chat = await Chat.findById(packet.payload.chatId)

  if (!chat) {
    throw new Error("Chat not found")
  }

  const msg = {
    chatId: chat.id,
    author: user.id,
    content: packet.payload.content,
    usersRead: [user.id]
  }

  const message = await Message.create(msg)

  message.save({validateBeforeSave: false})

  chat.messages.push(message.id)
  chat.save()

  return chat.users
}

export default createMessage
