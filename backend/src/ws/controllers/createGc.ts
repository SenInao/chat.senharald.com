import Chat from "../../models/chat";
import User from "../../models/user";
import { Packet } from "../packet";

async function createGc(packet: Packet) {
  if (!packet.payload.title) {
    throw new Error("Title required")
  }

  const user = await User.findById(packet.id)
  if (!user) {
    throw new Error("User not found")
  }

  const chat = await Chat.create({
    dm: false,
    title: packet.payload.title,
    users: [packet.id],
    messages: []
  })

  await chat.save()
  user.chats.push(chat._id)
  await user.save()

  return [user._id]
}

export default createGc
