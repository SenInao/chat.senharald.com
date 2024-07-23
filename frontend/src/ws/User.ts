import { Chat } from "./Chat"

interface User {
  id: String,
  fullname: String,
  username: String,
  email: String,
  profilePicture: string,
  chats: Chat[],
  friends: User[],
  friendRequests: User[]
}

export default User
