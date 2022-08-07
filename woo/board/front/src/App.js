import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Lists from "./component/Lists";
import Regist from "./component/Regist";
import Modify from "./component/Modify";
import View from "./component/View";

function App() {
  return (
    <>
      <div className="static items-center border-black">
        <button className="px-4 py-2 float-left border-slate-500">
          <Link to="/"> HOME </Link>
        </button>
        <button className="px-4 py-2 ">
          <Link to="./Regist"> 게시물작성 </Link>
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Lists />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/view" element={<View />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/delete" element={<Regist />} />
      </Routes>
    </>
  );
}

export default App;
