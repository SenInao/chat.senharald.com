import './App.css'
import { Sidebar } from './components/sidebar/Sidebar'
import { Chatfield } from './components/Chatfield/Chatfield'
import { useEffect, useState } from "react"
import { getUser } from "./utils/getUser"
import UserType from "./ws/User"
import { Chat } from './ws/Chat'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { AddFriend } from './components/AddFriend/AddFriend'
import { FriendRequests } from './components/FriendRequests/FriendRequests'
import { CreateGC } from './components/CreateGC/CreateGC'

function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<UserType | null>(null)
  const [chatContent, setChatContent] = useState<Chat | null>(null)

  useEffect(() => {
    getUser().then((user) => {
      if (!user) {
        return false
      }
      setUser(user)
      console.log(user)
    })
    setLoading(false)
  }, [])

  if (loading) {
    return <div className='App'>Loading...</div>
  }

  if (!user) {
    return <div className='App'>Not logged in</div>
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={
            <div className='ChatContainer'>
              <Sidebar user={user} chatContentSetter={setChatContent}/>
              <Chatfield user={user} chatContent={chatContent} setUser={setUser} chatContentSetter={setChatContent}/>
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
