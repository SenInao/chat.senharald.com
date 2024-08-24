import { useState, useEffect, useContext } from 'react';
import './App.css';
import Friends from './components/friends/Friends';
import { WsProvider } from './context/WsContext';
import MainContainer from './layout/mainContainer/MainContainer';
import Sidebar from './layout/sidebar/Sidebar';

export interface MainWindow {
  Content : React.ComponentType
  setContent : (component: () => React.ComponentType<{}>) => void
  title : string
  setTitle : (title: string) => void
  sidebarVisible : boolean
  setSidebarVisible : (state: boolean) => void
  showInfo : boolean
  setShowInfo : (state: boolean) => void
}

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [MainContent, setMainContent] = useState<React.ComponentType>(() => Friends)
  const [headerTitle, setHeaderTitle] = useState<string>("Friends")
  const [showInfo, setShowInfo] = useState<boolean>(true)

  const context = useContext(WsProvider)

  if (!context) throw new Error("Context missing")

  const {ws, user, chat, setChat} = context

  const mainWindow = {
    Content : MainContent,
    setContent : setMainContent,
    title : headerTitle,
    setTitle : setHeaderTitle,
    sidebarVisible : sidebarVisible,
    setSidebarVisible : setSidebarVisible,
    showInfo : showInfo,
    setShowInfo : setShowInfo
  }

  useEffect(() => {
    if (chat && user) {
      user.chats.forEach(uchat => {
        if (uchat._id === chat._id) {
          setChat(uchat)
        }
      })
    }
  }, [user, chat, setChat])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 780;

 
  if (!ws) {
    return (
      <div className='no-access'>
        <h1>Not logged in</h1>
        <div>
          <button onClick={() => {window.location.href = "http://senharald.com/login?redirect=chat.senharald.com"}}>Log in</button>
          <button onClick={() => {window.location.href = "http://senharald.com/register?redirect=chat.senharald.com"}}>Register</button>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      {(!isMobile || sidebarVisible) && <Sidebar mainWindow={mainWindow}/>}
      {(!isMobile || !sidebarVisible) && <MainContainer mainWindow={mainWindow}/>}
    </div>
  );
}

export default App;
