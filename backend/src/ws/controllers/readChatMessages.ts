import Chat from "../../models/chat";
import Message from "../../models/message";
import { Packet } from "../packet";

async function readChatMessages(packet:Packet) {
  if (!packet.payload.chatId) {
    throw new Error("chatId required");
  }

  const chat = await Chat.findById(packet.payload.chatId);

  if (!chat) {
    throw new Error("Chat not found");
  }

  const messages = await Message.find({
    _id: { $in: chat.messages }
  });

  await Promise.all(messages.map(async (msg) => {
    if (!msg.usersRead.includes(packet.id)) {
      msg.usersRead.push(packet.id);
      await msg.save();
    }
  }));

  return chat.users;
}

export default readChatMessages
