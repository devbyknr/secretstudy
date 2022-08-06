import "./App.css";
import { Route, Routes } from "react-router-dom";
import Lists from "./component/Lists";
import Regist from "./component/Regist";
import Modify from "./component/Modify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Lists />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/delete" element={<Regist />} />
      </Routes>
    </>
  );
}

export default App;
