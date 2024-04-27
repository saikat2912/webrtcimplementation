import logo from './logo.svg';

import {Routes,Route} from "react-router-dom"
import HomePage from './pages/HomePage';
import { SocketProvider } from './providers/Socket';
import RoomPage from './pages/Room';

function App() {
  return (
    <div className="App">
        <SocketProvider>
      <Routes>
      
        <Route path="/" element={<HomePage/>}/>
        <Route path="/room/:roomId" element={<RoomPage/>}/>
        
      </Routes>
      </SocketProvider>
    </div>
  );
}

export default App;
