import Chat from "../../models/chat";
import User from "../../models/user";
import { Packet } from "../packet";

async function handleFriendRequest(packet: Packet) {
  if (!packet.payload.username) {
    throw new Error("Username required")
  }

  if (packet.payload.acceptRequest == null) {
    throw new Error("acceptRequest required")
  }

  const user = await User.findById(packet.id)
  const friendToAccept = await User.findOne({username: packet.payload.username})

  if (!user) {
    throw new Error("User not found")
  }

  if (!friendToAccept) {
    throw new Error("Friend not found")
  }

  if (!user.friendRequests.includes(friendToAccept.id)) {
    throw new Error("No friend request from that user")
  }

  user.friendRequests.splice(user.friendRequests.indexOf(friendToAccept.id))

  if (!packet.payload.acceptRequest) {
    user.save()
    return [user._id]
  }

  user.friends.push(friendToAccept.id)
  friendToAccept.friends.push(user.id)

  const chat = await Chat.create({
    dm: true,
    title: "DM",
    users: [user.id, friendToAccept.id],
    messages: [],
  })

  await chat.save({validateBeforeSave:false})

  user.chats.push(chat.id)
  friendToAccept.chats.push(chat.id)

  user.save()
  friendToAccept.save()

  return [user._id, friendToAccept._id]
}

export default handleFriendRequest
