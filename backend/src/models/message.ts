import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      required:true,
      ref:"User"
    },
    receiver: {
      type: String,
      required:true,
      ref:"User"
    },
    content: {
      type:String,
      required:true
    }
  }
)

const Message = mongoose.model("Message", messageSchema)

export default Message
