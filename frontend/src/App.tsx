import './App.css'
import { Sidebar } from './components/sidebar/Sidebar'
import { Chatfield } from './components/Chatfield/Chatfield'
import { useEffect, useState} from "react"
import User from './ws/User'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { AddFriend } from './components/AddFriend/AddFriend'
import { FriendRequests } from './components/FriendRequests/FriendRequests'
import { CreateGC } from './components/CreateGC/CreateGC'
import WS, {Update} from './ws/ws'
import { getUser } from './utils/getUser'

function App() {
  const [sidebarInView, setSidebarView] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [chatIndex, setChatIndex] = useState<number | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [ws, setWS] = useState<WS | null>(null)

  const msgCallback = (update: Update) => {
    if (update.status && update.user) {
      setUser(update.user)
      if (user && chatIndex !== null && ws) {
        ws.send("read-chat-messages", {chatId: user.chats[chatIndex]._id})
      }
    }
  }

  useEffect(() => {
    try {
      getUser().then(newUser => {
        if (newUser) {
          newUser._id = newUser.id
          setUser(newUser)
          const newWs = new WS(`ws://${window.location.hostname}:8081`, newUser.id)
          newWs.msgCallback = msgCallback
          setWS(newWs)
        }
      })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className='no-access'>
        <h1>Loading</h1>
      </div>
    )
  }

  if (!user || !ws) {
    return (
      <div className='no-access'>
        <h1>Not logged in</h1>
        <div>
          <button onClick={() => {window.location.href = "http://senharald.com/login?redirect=chat.senharald.com"}}>Log in</button>
          <button onClick={() => {window.location.href = "http://senharald.com/register?redirect=chat.senharald.com"}}>Register</button>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={
            <div className='ChatContainer'>
              <Sidebar user={user} setChatIndex={setChatIndex} sidebarInView={sidebarInView} setSidebarView={setSidebarView} ws={ws}/>
              <Chatfield ws={ws} user={user} chatIndex={chatIndex} sidebarInView={sidebarInView} setSidebarView={setSidebarView}/>
            </div>
          }/>
          <Route path='/add-friend' element={<AddFriend ws={ws}/>}/>
          <Route path='/pending-requests' element={<FriendRequests user={user} ws={ws}/>}/>
          <Route path='/create-gc' element={<CreateGC ws={ws}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
