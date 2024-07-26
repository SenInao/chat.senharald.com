import { Packet } from "../packet";
import User from "../../models/user";

async function addFriend(packet:Packet) {
  if (!packet.payload.username) {
    throw new Error("Username required")
  }

  const user = await User.findById(packet.id)
  const friend = await User.findOne({username: packet.payload.username})

  if (!user || !friend) {
    throw new Error("User not found")
  }

  if (user.username == packet.payload.username) {
    throw new Error("Cannot add yourself as a friend ;)")
  }
  if (user.friends.includes(friend.id)) {
    throw new Error("Already friends with this user")
  }
  if (friend.friendRequests.includes(user.id)) {
    throw new Error("Already sent friend request")
  }

  if (user.friendRequests.includes(friend.id)) {
    throw new Error("Already received friend request from that user")
  }

  friend.friendRequests.push(user.id)
  await friend.save()

  return [friend._id]
}

export default addFriend
