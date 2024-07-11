import Chat from "../models/chat";
import { Message, Connection, Packet } from "../ws/packet";
import Result from "../ws/result";
import findUserIndex from "./findUserIndex";

export async function broadcastToChat(message: Message, users: Connection[]) {
  const chat = await Chat.findById(message.chatId)

  if (!chat) {return}

  const packet: Result= {
    status: true,
    update: {update: "new-message", payload: message}
  }

  chat.users.forEach((user) => {
    const indexes = findUserIndex(user._id, users)
    indexes.forEach((i) => {
      users[i].ws.send(JSON.stringify(packet))
    })
  })
}
