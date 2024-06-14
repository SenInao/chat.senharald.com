import WebSocket from "ws"

export const actions = {
  "create-message": (packet:Packet, ws:WebSocket) => {
    console.log("Creating message")
    console.log(packet)
  },
}

export interface Packet {
  id: String,
  action: keyof typeof actions,
  payload: {}
}
