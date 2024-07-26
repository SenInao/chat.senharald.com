import { RefObject } from "react";

const infoLabelShow = (msg: string, color: string, ref: RefObject<HTMLLabelElement>) => {
  if (ref.current) {
    ref.current.innerText = msg
    ref.current.style.color = color
    ref.current.style.display = "block"
  }
}

const infoLabelHide = (ref: RefObject<HTMLLabelElement>) => {
  if (ref.current) {
    ref.current.style.display = "none"
  }
}

export {infoLabelHide, infoLabelShow}
