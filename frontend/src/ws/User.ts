import { Chat } from "./Chat"

interface User {
  _id: string
  fullname: string
  username: string
  email: string
  profilePicture: string
  chats: Chat[]
  friends: User[]
  friendRequests: User[]
}

export default User
