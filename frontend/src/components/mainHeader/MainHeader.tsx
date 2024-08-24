import "./MainHeader.css"
import { FaArrowLeft } from "react-icons/fa";
import { MainWindow } from "../../App";
import { useContext } from "react";
import { WsProvider } from "../../context/WsContext";
import MoreButton from "./MoreButton";

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
      <MoreButton mainWindow={mainWindow}/>
    </div>
  )
}

export default MainHeader
