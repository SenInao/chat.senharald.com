import findUserByWs from "./findUserByWs"
import {Connection} from "../ws/packet";
import {WebSocket} from "ws"

export default function removeUserConnected(ws: WebSocket, usersConnected:Connection[]) {
    const i = findUserByWs(ws, usersConnected)
    if (i !== false) {
      usersConnected.splice(i, 1)
    }
} 
