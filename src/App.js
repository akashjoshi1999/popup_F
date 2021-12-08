import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Modal from './components/Modal/Model';
import Home from './components/Home';
import Showmap from './components/Map/Showmap';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/map" element={<Showmap/>}/>
          <Route path="/pop" element={<Modal/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
