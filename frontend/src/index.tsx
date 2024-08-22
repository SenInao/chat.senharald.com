import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WsContext } from './context/WsContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <WsContext>
    <App />
  </WsContext>
);
