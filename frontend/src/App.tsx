import './App.css'
import { Sidebar } from './components/sidebar/Sidebar'
import { Chatfield } from './components/Chatfield/Chatfield'
import { useEffect, useState } from "react"
import { getUser } from "./utils/getUser"
import WS from './ws/ws'

interface User {
  fullname: String,
  username: String,
  email: String,
  profilePicture: String,
  chats: [],
  friends: []
}

function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    getUser().then((user) => {
      if (!user) {
        return false
      }

      setUser(user)
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
      <Sidebar friends={user.friends}/>
      <Chatfield/>
    </div>
  );
}

export default App;
