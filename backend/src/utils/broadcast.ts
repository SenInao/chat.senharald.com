import Chat from "../models/chat";
import { Message, Connection } from "../ws/packet";
import findUserIndex from "./findUserIndex";

export async function broadcastToChat(message: Message, users: Connection[]) {
  const chat = await Chat.findById(message.chatId)

  if (!chat) {return}

  chat.users.forEach((user) => {
    const i = findUserIndex(user._id, users)
    if (!i) {return}
    users[i].ws.send(JSON.stringify(message))
  })
}
