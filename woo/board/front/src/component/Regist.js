import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerBoard } from "../_actions/board_actions";
const Regist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      title: title,
      content: contents,
      data: Date.now(),
      name: name,
    };
    dispatch(registerBoard(data)).then((response) => {
      if (response.payload.loadBoardSuccess) {
        alert("게시물 등록 성공");
        navigate("/");
      } else {
        alert("게시물 등록 실패");
      }
    });
  };
  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "contents") {
      setContents(e.target.value);
    } else if (e.target.name === "name") {
      setName(e.target.value);
    }
  };
  return (
    <div>
      <div className="bg-blue-100">
        <form style={{ display: "" }} onSubmit={handleSubmit} className="pt-2">
          <input
            type="text"
            name="title"
            className="w-full px-3 py-2 mr-4   text-gray-500 border-rounded shadow"
            placeholder="제목"
            onChange={handleChange}
          />
          <input
            type="text"
            name="contents"
            className="w-full px-3 py-2 mr-4 h-48 text-gray-500 border-rounded shadow"
            placeholder="내용"
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 mr-4 text-gray-500 border-rounded shadow"
            placeholder="작성자이름"
            onChange={handleChange}
          />
          <input
            type="submit"
            value="입력"
            className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400"
            style={{ flex: "1" }}
          />
        </form>
      </div>
    </div>
  );
};

export default Regist;
