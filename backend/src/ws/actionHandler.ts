import WebSocket from "ws";
import {Connection, Packet, Update} from "./packet";
import register from "./controllers/register";
import createMessage from "./controllers/createMessage";
import { broadcastToUsers, returnUpdate } from "../utils/broadcast";
import addFriend from "./controllers/addFriend";
import handleFriendRequest from "./controllers/handleFriendRequest";
import chatInvite from "./controllers/chatInvite";
import createGc from "./controllers/createGc";
import readChatMessages from "./controllers/readChatMessages";

async function handler(packet: Packet, ws:WebSocket, connections: Connection[]) {
  console.log(packet)
  try {
    var users = [packet.id]

    if (packet.action === "create-message") {
      users = await createMessage(packet)
    } else if (packet.action === "add-friend") {
      users = await addFriend(packet)
    } else if (packet.action === "register") {
      register(packet, ws, connections)
    } else if (packet.action === "handle-friend-request") {
      users = await handleFriendRequest(packet)
    } else if (packet.action === "chat-invite") {
      users = await chatInvite(packet)
    } else if (packet.action === "create-gc") {
      users = await createGc(packet)
    } else if (packet.action === "read-chat-messages") {
      users = await readChatMessages(packet)
    }

    const update:Update = {
      status:true,
      id: packet.requestId
    }

    broadcastToUsers(users, connections)
    returnUpdate(packet.id, update, connections)

  } catch (error:any) {
    const update:Update = {
      status: false,
      id: packet.requestId,
      msg: error.message
    }
    returnUpdate(packet.id, update, connections)
  }
}

export default handler
