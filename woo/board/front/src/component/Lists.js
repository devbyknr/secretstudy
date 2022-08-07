import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
      <table class="table-fixed items-center justify-between w-full ">
        <thead className="border-spacing-2 border border-slate-500">
          <tr>
            <th className="border-spacing-2 border border-slate-500 w-8">
              No.
            </th>
            <th className="border-spacing-2 border border-slate-500">제목</th>
            <th className="border-spacing-2 border border-slate-500 w-64">
              작성자
            </th>
          </tr>
        </thead>
        <tbody className="border-spacing-2 border border-slate-500">
          {boardList.length !== 0 &&
            boardList.map((item) => (
              <tr>
                <td className="border-spacing-2 border border-slate-500">
                  {item.id}
                </td>
                <td className="border-spacing-2 border border-slate-500">
                  <Link
                    to="./View"
                    state={{ data: item }}
                    className="text-blue-600"
                  >
                    {item.title}
                  </Link>
                </td>
                <td className="border-spacing-2 border border-slate-500">
                  {item.name}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Lists;
