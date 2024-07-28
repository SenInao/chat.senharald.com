import UserType from "./User"

export interface Message {
  _id: string
  chatId: string
  author: UserType
  content: string
  usersRead: string[]
  createdAt: string
  updatedAt: string
}

export interface Chat {
  _id: string
  dm: Boolean
  title: string
  users: UserType[]
  messages: Message[]
}
