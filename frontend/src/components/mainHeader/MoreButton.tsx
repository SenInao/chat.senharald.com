import { MainWindow } from "../../App"
import { IoReorderThreeOutline } from "react-icons/io5";
import GcInfo from "../chat/GcInfo"
import { useContext } from "react";
import { WsProvider } from "../../context/WsContext";
import Chat from "../chat/Chat";

interface Props {
  mainWindow : MainWindow
}

const MoreButton: React.FC<Props> = ({mainWindow}) => {
  const context = useContext(WsProvider)
  if (!context) throw new Error("missing context")
  const {chat} = context

  function buttonClick() {
    if (mainWindow.showInfo) {
      mainWindow.setContent(() => GcInfo)
      mainWindow.setShowInfo(false) 
    } else {
      mainWindow.setShowInfo(true) 
      mainWindow.setContent(() => Chat)
    }
  }

  if (!chat || chat.dm) {
    return null
  }

  return (
    <div className="more-button" onClick={buttonClick}>
      <IoReorderThreeOutline/> 
    </div>
  )
}

export default MoreButton
