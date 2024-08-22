import dotenv from "dotenv"
dotenv.config()
import { WebSocketServer} from "ws";
import {Packet, Connection} from "./ws/packet";
import actionHandler from "./ws/actionHandler"
import Result from "./ws/result";
import dbConnect from "./config/db";
import removeUserConnected from "./utils/removeUserConnected";

dbConnect()

const usersConnected: Connection[] = []


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
      actionHandler(packet, ws, usersConnected)

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
    removeUserConnected(ws, usersConnected)
  })

  ws.on("error", (error) => {
    console.log(error)
    removeUserConnected(ws, usersConnected)
  })
})
