export function infoLabelShow (msg: string, color: string, ref: React.RefObject<HTMLLabelElement>) {
  if (ref.current) {
    ref.current.innerText = msg
    ref.current.style.color = color
    ref.current.style.display = "block"
  }
}

