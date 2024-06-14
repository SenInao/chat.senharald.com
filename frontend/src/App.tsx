import './App.css'
import { Sidebar } from './components/sidebar/Sidebar'
import { Chatfield } from './components/Chatfield/Chatfield'
import { useEffect, useState } from "react"
import { getUser } from "./utils/getUser"
import UserType from "./ws/User"

function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<UserType | null>(null)

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
      <Chatfield user={user}/>
    </div>
  );
}

export default App;
