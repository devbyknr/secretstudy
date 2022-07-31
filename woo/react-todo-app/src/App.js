import React, { useCallback, useMemo, useState } from "react";
import "./App.css";
import Form from "./component/Form";
import Lists from "./component/Lists";
export default function App() {
  console.log("App component");
  const initialTodoData = localStorage.getItem("todoData")
    ? JSON.parse(localStorage.getItem("todoData"))
    : [];
  const [todoData, setToDoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  // /* useMemo 사용법 */
  // //compute함수가 연산을 수행하고 값을 리턴하는데, 오랜시간이 걸릴수 있다.
  // //계속 리랜더링을 하게 된다면, 성능에 안종을 영향을 미칠수 있기때문에,
  // //이럴때 사용하는 hook이 useMemo
  // function test({ a, b }) {
  //   //const result = compute(a, b);
  //   const result = useMemo(() => compute(a, b), [a, b]);
  //   //위에 값이 변하지 않으면 리랜더링을 하지 않는다!!!
  //   return <div>{result}</div>;
  // }

  //최상단에 함수가 있기때문에! 관련 모든 자식 컴포넌트에서 리랜더링이 됨
  //useCallback으로 인해 todoData가 변하지 않는다면 함수는 새로 생성되지 않는다.
  //새로 생성되지 않기때문에 메모리에 새로 할당하지 않고 기존 참조값을 그대로 사용한다.!

  const handleClick = useCallback(
    (id) => {
      //filter는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.
      let results = todoData.filter((filterData) => filterData.id !== id);
      console.log("result", results);
      //hook을 안쓰고이렇게 바꿀수가 있네??
      setToDoData(results);
      localStorage.setItem("todoData", JSON.stringify(results));
    },
    [todoData]
  );

  const handleSubmit = (e) => {
    //값을 추가하고
    //setState 다시하고

    //form안에 input을 전송할 때 페이지 리로드 되는걸 막아줌!!
    e.preventDefault();

    let newData = {
      id: Date.now(),
      title: value,
      completed: false,
    };
    setToDoData((prev) => [...prev, newData]);
    localStorage.setItem("todoData", JSON.stringify([...todoData, newData]));
    setValue("");
  };

  const handleRemoveClick = () => {
    setToDoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <Lists
          handleClick={handleClick}
          todoData={todoData}
          setToDoData={setToDoData}
        ></Lists>
        <Form
          handleSubmit={handleSubmit}
          value={value}
          setValue={setValue}
        ></Form>
      </div>
    </div>
  );
}
// export default class App extends Component {
//   state = {
//     todoData: [
//       {
//         id: "1",
//         title: "공부하기",
//         completed: false,
//       },
//       {
//         id: "2",
//         title: "청소하기",
//         completed: false,
//       },
//     ],
//     value: "",
//   };

//   btnStyle = {
//     color: "#fff",
//     border: "none",
//     padding: "5px 9px",
//     borderRadius: "50%",
//     cursor: "pointer",
//     float: "right",
//   };

//   //리액트에서 삼항연산자 많이 쓴다고 했음
//   getstyle = (completed) => {
//     return {
//       padding: "10px",
//       borderBottom: "1px #ccc dotted",
//       textDecoration: completed ? "line-through" : "none",
//     };
//   };

//   handleClick = (id) => {
//     //filter는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.
//     let results = this.state.todoData.filter(
//       (filterData) => filterData.id !== id
//     );
//     console.log("result", results);
//     //hook을 안쓰고이렇게 바꿀수가 있네??
//     this.setState({ todoData: results });
//   };

//   handleChange = (e) => {
//     this.setState({ value: e.target.value });
//   };

//   handleSubmit = (e) => {
//     //값을 추가하고
//     //setState 다시하고

//     //form안에 input을 전송할 때 페이지 리로드 되는걸 막아줌!!
//     e.preventDefault();

//     let newData = {
//       id: Date.now(),
//       title: this.state.value,
//       completed: false,
//     };
//     this.setState({ todoData: [...this.state.todoData, newData] });
//     this.setState({ value: "" });
//   };

//   handleChageComplete = (item) => {
//     if (item.completed) {
//       item.completed = false;
//     } else {
//       item.completed = true;
//     }
//     this.setState({ todoData: [...this.state.todoData] });
//   };

//   render() {
//     return (
//       <div className="container">
//         <div className="todoBlock">
//           <div className="title">
//             <h1>할 일 목록</h1>
//           </div>

//           {/* 소스코드가 중복이 되기때문에 데이터를 받아서 map으로 처리하자(반복문) */}
//           {this.state.todoData.map((item) => (
//             // 여기서 map을 쓸경우에 key를 명시해주어야 한다!
//             // 키는 요소변경 식별에 도움이 되기때문에 안정적인 ID를 부여하려면 key속성을 주어야 한다
//             // 계속해서 경고가 뜨기 떄문에 가급적 명시하여 주자!!!
//             // 키는 유니크한 값으로 해야 한다.
//             <div style={this.getstyle(item.completed)} key={item.id}>
//               <p>
//                 <input
//                   type="checkbox"
//                   defaultChecked={false}
//                   onClick={() => this.handleComplete(item)}
//                 />
//                 {item.title}
//                 <button
//                   style={this.btnStyle}
//                   onClick={() => this.handleClick(item.id)}
//                 >
//                   X
//                 </button>
//               </p>
//             </div>
//           ))}
//           <form style={{ display: "flex" }} onSubmit={this.handleSubmit}>
//             <input
//               type="text"
//               name="value"
//               style={{ flex: "10", padding: "5px" }}
//               placeholder="해야 할 일을 입력하세요"
//               value={this.state.value}
//               onChange={this.handleChange}
//             />
//             <input
//               type="submit"
//               value="입력"
//               className="btn"
//               style={{ flex: "1" }}
//             />
//           </form>
//         </div>
//       </div>
//     );
//   }
// }
