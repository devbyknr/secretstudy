import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Footer from "./components/views/Footer/Footer";
import NavBar from "./components/views/NavBar/NavBar";
import Auth from "./hoc/auth";


import './App.css';

function App() {

  let AuthLandingPage = Auth(LandingPage,null);
  let AuthLoginPage = Auth(LoginPage,false);
  let AuthRegisterPage = Auth(RegisterPage,false);

  return ( 
    <BrowserRouter>
    <div>
      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
      <Routes>
        <Route path="/" element={<AuthLandingPage/>}></Route> 
        <Route path="/login" element={<AuthLoginPage/>}></Route>
        <Route path="/register" element={<AuthRegisterPage/>}></Route>
        <Route path="/footer" element={<Footer />}></Route>
        <Route path="/navbar" element={<NavBar />}></Route>
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;

