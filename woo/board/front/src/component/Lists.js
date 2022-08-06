import React, { useState, useEffect } from "react";
import View from "./View";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadList } from "../_actions/board_actions";

//불필요한 렌더링을 최적화 한다!!!
const Lists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    dispatch(loadList()).then((response) => {
      if (response.payload.listLoadSuccess) {
        setBoardList(response.payload.boardList);
      } else {
        alert("Error");
      }
    });
  }, []);

  return (
    <>
      <div className="items-center">
        <button className="px-4 py-2 float-left">
          <Link to="/"> HOME </Link>
        </button>
        <button className="px-4 py-2 float-left">
          <Link to="./Regist"> 게시물작성 </Link>
        </button>
      </div>
      <div className="flex items-center w-screen h-screen bg-blue-100">
        {boardList.length === 0 ? (
          <div>게시물이 없습니다.</div>
        ) : (
          boardList.map((item, index) => (
            <div className="w-full p-6 m-4 bg-white rounded shadow">
              <span>{item.title}</span>

              <span>{item.content}</span>
              <br />
              <span>{item.date}</span>
              <br />
              <span>{item.name}</span>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Lists;
