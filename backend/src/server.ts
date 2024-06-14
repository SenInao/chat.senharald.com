import dotenv from "dotenv"
import { WebSocketServer } from "ws";
import {Packet} from "./ws/packet";
import actionHandler from "./ws/actionHandler"
import Result from "./ws/result";

dotenv.config()

let port = process.env.PORT || 3000

if (typeof port === "string") {
  port = parseInt(port)
}

const wss = new WebSocketServer({port})
console.log("Server running at ws://localhost:" + port)

wss.on('connection', (ws) => {
  ws.on("message", (data) => {
    try {

      const packet:Packet = JSON.parse(data.toString())
      actionHandler(packet, ws)

    } catch (error) {
      console.log(error)

      const result: Result = {
        status: false,
        error: error
      }

      ws.send(JSON.stringify(result))
    }
  })

  ws.on("close", () => {
    console.log("Connection closed")
  })

  ws.on("error", (error) => {
    console.log(error)
  })
})
