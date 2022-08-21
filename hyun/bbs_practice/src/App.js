import React from 'react'
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import BBSLists from './components/BBSLists'
import BBSWrite from './components/BBSWrite';
import BBSInq from './components/BBSInq';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BBSLists/>}></Route> 
        <Route path="/write" element={<BBSWrite/>}></Route> 
        <Route path="/inq" element={<BBSInq/>}></Route> 
      </Routes>
     </BrowserRouter>
  )
}

export default App