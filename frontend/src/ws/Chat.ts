import UserType from "./User"

export interface Message {
  _id: String,
  chatId: String,
  author: UserType,
  content: String
  createdAt: String,
  updatedAt: String,
}

export interface Chat {
  _id: String,
  dm: Boolean,
  title: String,
  users: UserType[],
  messages: Message[]
}
