import UserType from "./User"

export interface Message {
  chatId: String,
  author: String,
  content: String
}

export interface Chat {
  _id: String,
  title: String,
  users: UserType[],
  messages: Message[]
}
