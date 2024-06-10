import dotenv from "dotenv"
import { WebSocketServer } from "ws";

dotenv.config()

let port = process.env.PORT || 3000

if (typeof port === "string") {
  port = parseInt(port)
}

const wss = new WebSocketServer({port})
console.log("Server running on port " + port)

wss.on('connection', (ws) => {
  console.log("New connection")

  ws.on("message", (data) => {
    try {
      console.log(JSON.parse(data.toString()))
    } catch (error) {
      console.log(error)
    }
  })

  ws.on("close", () => {
    console.log("Connection closed")
  })

  ws.on("error", (error) => {
    console.log(error)
  })
})
