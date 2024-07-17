import { Chat } from "./Chat"

interface User {
  id: String,
  fullname: String,
  username: String,
  email: String,
  profilePicture: String,
  chats: Chat[],
  friends: User[],
  friendRequests: User[]
}

export default User
