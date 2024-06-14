import mongoMessage from "../../models/message";
import User from "../../models/user";
import { Packet } from "../packet";

async function createMessage(packet: Packet) {
  if (!packet.message) {
    return
  }

  try {
    const author = await User.findById(packet.id)

    if (!author) {
      throw new Error("User not found")
    }

    const receiver = await User.findOne({username:packet.message.receiver})

    if (!receiver) {
      throw new Error("User not found")
    }

    const msg = {
      receiver: receiver.username,
      content: packet.message.content
    }

    const message = await mongoMessage.create(
      {
        author: author.id,
        receiver: receiver.username,
        content: packet.message.content,
      }
    )

    message.save({validateBeforeSave: false})

    return msg
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default createMessage
