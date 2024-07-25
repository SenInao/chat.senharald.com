import './App.css'
import { Sidebar } from './components/sidebar/Sidebar'
import { Chatfield } from './components/Chatfield/Chatfield'
import { useEffect, useState} from "react"
import User from './ws/User'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { AddFriend } from './components/AddFriend/AddFriend'
import { FriendRequests } from './components/FriendRequests/FriendRequests'
import { CreateGC } from './components/CreateGC/CreateGC'
import WS from './ws/ws'
import { getUser } from './utils/getUser'
import Update from './ws/update'

function App() {
  const [chatIndex, setChatIndex] = useState<number | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [ws, setWS] = useState<WS | null>(null)


  const msgCallback = (update: Update) => {
    if (update.status) {
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

  if (!user) {
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
          <Route path='/add-friend' element={<AddFriend/>}/>
          <Route path='/pending-requests' element={<FriendRequests user={user} setUser={setUser}/>}/>
          <Route path='/create-gc' element={<CreateGC/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
