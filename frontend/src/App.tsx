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
  const [chatIndex, setChatIndex] = useState<number | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [ws, setWS] = useState<WS | null>(null)

  const msgCallback = (update: Update) => {
    if (update.status && update.user) {
      setUser(update.user)
    }
  }

  useEffect(() => {
    try {
      getUser().then(newUser => {
        if (newUser) {
          setUser(newUser)
          const newWs = new WS("ws://localhost:8080", newUser.id)
          newWs.msgCallback = msgCallback
          setWS(newWs)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  if (!user || !ws) {
    return <div className='App'>Not logged in</div>
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={
            <div className='ChatContainer'>
              <Sidebar user={user} setChatIndex={setChatIndex}/>
              <Chatfield ws={ws} user={user} chatIndex={chatIndex}/>
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
