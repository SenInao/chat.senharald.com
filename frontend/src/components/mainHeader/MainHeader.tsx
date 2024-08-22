import "./MainHeader.css"
import { FaArrowLeft } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";
import { MainWindow } from "../../App";
import GcInfo from "../chat/GcInfo";
import { useContext } from "react";
import { WsProvider } from "../../context/WsContext";

interface Props {
  mainWindow: MainWindow
}

const MainHeader : React.FC<Props> = ({mainWindow}) => {
  const context = useContext(WsProvider)
  if (!context) throw new Error("missing context")
  const {chat} = context

  return (
    <div className="main-header">
      <div className="back-button" onClick={() => mainWindow.setSidebarVisible(!mainWindow.sidebarVisible)}>
        <FaArrowLeft/>
      </div>
      <label className="header-title">{mainWindow.title}</label>
      {chat && !chat.dm ? (
        <div className="more-button" onClick={() => {
          mainWindow.setContent(() => GcInfo)
        }}>
          <IoReorderThreeOutline/> 
        </div>
      ) : null}
    </div>
  )
}

export default MainHeader
