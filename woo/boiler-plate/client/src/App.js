import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/Landingpage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        {/*
          react-router-dom 에서 6버전 이상 부터는
          Switch를 더이상 지원하지 않는다.
          Switch에서 Routes로 변경 되었으며, 
          NextJs에서는 next/router를 통해서 routing가능!
        */}
          <Route exact path="/" element={<LandingPage/>}/>
          <Route path="/Login" element={<LoginPage/>}/>
          <Route path="/Register" element={<RegisterPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;

