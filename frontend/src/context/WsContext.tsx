import { useEffect, useState, createContext } from "react"
import { getUser } from "../ws/getUser"
import WS from "../ws/ws"

export interface Message {
  _id: string
  chatId: string
  author: User
  content: string
  usersRead: string[]
  createdAt: string
  updatedAt: string
}

export interface Chat {
  _id: string
  dm: Boolean
  title: string
  users: User[]
  messages: Message[]
}

export interface User {
  _id: string
  fullname: string
  username: string
  email: string
  profilePicture: string
  chats: Chat[]
  friends: User[]
  friendRequests: User[]
}

interface contextType {
  ws: WS | null
  chat : Chat | null
  setChat : (chat:Chat | null) => void
  setUser: (user: User | null) => void
  user: User | null
}

const WsProvider = createContext<contextType | undefined>(undefined)

const WsContext = ({children}:{children:React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null)
  const [ws, setWS] = useState<WS | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [chat, setChat] = useState<Chat | null>(null)

  useEffect(() => {
    getUser().then(user => {
      if (!user) {
        return
      }
      
      var newWs = new WS("ws://192.168.0.9:8081", user, setUser)
      setWS(newWs)
      setUser(user)
    }).finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="no-access">
        <h1>Loading</h1>
      </div>
    )
  }

  return (
    <WsProvider.Provider value={{ws, chat, setChat, setUser, user}}>
      {children}
    </WsProvider.Provider>
  )
}

export {WsContext, WsProvider}
