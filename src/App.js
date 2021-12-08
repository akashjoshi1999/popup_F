import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Modal from './components/Model';
import Home from './components/Home';
import './App.css';
import Showmap from './components/Showmap';

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
