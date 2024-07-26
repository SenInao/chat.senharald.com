import {wsRequest} from "../ws/ws"

function generateId(pendingRequests: wsRequest[]) {
  let id = 0
  while (true) {
    id += 1
    for (let i = 0; i<pendingRequests.length; i++) {
      if (pendingRequests[i].id === id) {
        continue
      }
    }
    break
  }

  return id
}

export {generateId}
