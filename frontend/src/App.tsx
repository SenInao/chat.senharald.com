import './App.css'
import { Sidebar } from './components/sidebar/Sidebar'
import { Chatfield } from './components/Chatfield/Chatfield'
import { useEffect, useState } from "react"
import { getUser } from "./utils/getUser"
import UserType from "./ws/User"
import { Chat } from './ws/Chat'

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
      console.log(JSON.stringify(user))
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
      <Sidebar user={user} chatContentSetter={setChatContent}/>
      <Chatfield user={user} chatContent={chatContent} setUser={setUser} chatContentSetter={setChatContent}/>
    </div>
  );
}

export default App;
