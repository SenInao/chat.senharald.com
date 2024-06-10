import { WebSocketServer } from "ws";

let port = process.env.WSPORT || 3000

if (typeof port === "string") {
  port = parseInt(port)
}

const wss = new WebSocketServer({port})
console.log("ws running on port " + port)

wss.on('connection', (ws) => {
  console.log("New connection")

  ws.on("message", (message) => {
    console.log(message)
  })

  ws.on("close", () => {
    console.log("Connection closed")
  })

  ws.on("error", (error) => {
    console.log(error)
  })
})
