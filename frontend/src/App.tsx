import './App.css';
import { Sidebar } from './components/sidebar/Sidebar';
import { Chatfield } from './components/Chatfield/Chatfield';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Chatfield/>
    </div>
  );
}

export default App;
