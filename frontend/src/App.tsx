import './App.css'
import { Sidebar } from './components/sidebar/Sidebar'
import { Chatfield } from './components/Chatfield/Chatfield'
import { useEffect } from "react"
import { getUser } from "./utils/getUser"
import WS from './ws/ws'

function App() {
  const ws = new WS("ws://localhost:80")

  useEffect(() => {
    getUser().then((user) => {
      console.log(user)
      if (!user) {
        return
      }

      setTimeout(() => {
        if (ws.state != 0)
          ws.ws.send(user.toString())
      }, 1000)
    })
  })

  return (
    <div className="App">
      <Sidebar/>
      <Chatfield/>
    </div>
  );
}

export default App;
