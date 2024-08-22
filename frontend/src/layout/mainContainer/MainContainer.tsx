import { MainWindow } from "../../App"
import MainHeader from "../../components/mainHeader/MainHeader"
import "./MainContainer.css"

interface Props {
  mainWindow : MainWindow
}

const MainContainer: React.FC<Props> = ({mainWindow}) => {
  return (
    <div className="mainContainer">
      <MainHeader mainWindow={mainWindow}/>
      {mainWindow.Content && <mainWindow.Content/>}
    </div>
  )
}

export default MainContainer
