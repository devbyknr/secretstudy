import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modifyBoard, deleteBoard } from "../_actions/board_actions";

const View = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contents, setContents] = useState(
    location.state.data !== null ? location.state.data : ""
  );
  const [title, setTitle] = useState(contents.title);
  const [content, setContent] = useState(contents.content);
  const [name, setName] = useState(contents.name);

  const goModifyBoard = () => {
    let data = {
      id: location.state.data.id,
      title: title,
      content: content,
      data: Date.now().toString(),
      name: name,
    };
    dispatch(modifyBoard(data)).then((response) => {
      if (response.payload.modifyBoardSuccess) {
        alert("게시물 수정 성공");
        navigate("/");
      } else {
        alert("게시물 수정 실패");
      }
    });
  };
  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "contents") {
      setContent(e.target.value);
    } else if (e.target.name === "name") {
      setName(e.target.value);
    }
  };
  const goDeleteBoard = () => {
    let data = {
      id: location.state.data.id,
    };
    dispatch(deleteBoard(data)).then((response) => {
      if (response.payload.registSuccess) {
        alert("게시물 삭제 성공");
        navigate("/");
      } else {
        alert("게시물 삭제 실패");
      }
    });
  };
  return (
    <>
      <div>
        <div className="bg-blue-100">
          <input
            type="text"
            name="title"
            className="w-full px-3 py-2 mr-4   text-gray-500 border-rounded shadow"
            placeholder="제목"
            value={title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="contents"
            className="w-full px-3 py-2 mr-4 h-48 text-gray-500 border-rounded shadow"
            placeholder="내용"
            value={content}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 mr-4 text-gray-500 border-rounded shadow"
            placeholder="작성자이름"
            value={name}
            readOnly
            onChange={handleChange}
          />
          <button
            name="modify"
            value="수정"
            className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400"
            style={{ flex: "1" }}
            onClick={goModifyBoard}
          >
            수정
          </button>
          <button
            name="delete"
            value="삭제"
            className="p-2 text-rose-800 border-2 border-rose-400 rounded hover:text-white hover:bg-blue-400"
            style={{ flex: "2" }}
            onClick={goDeleteBoard}
          >
            삭제
          </button>
        </div>
      </div>
    </>
  );
};

export default View;
