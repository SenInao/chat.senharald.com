import UserType from "./User"

export interface Message {
  chatId: String,
  author: UserType,
  content: String
}

export interface Chat {
  id: String,
  title: String,
  users: UserType[],
  messages: Message[]
}
