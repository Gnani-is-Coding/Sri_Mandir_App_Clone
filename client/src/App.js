import './App.css';
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import { Route, Routes } from 'react-router-dom';
import Puja from './Components/Puja';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/puja" element={<Puja/>}/>
   </Routes>
   </>
  );
}

export default App;
