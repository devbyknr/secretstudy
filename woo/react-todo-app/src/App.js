import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import { render } from "@testing-library/react";
import React, { Component, useState, useEffect } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import "./App.css";
// export default function App(){
//   return(
//     <div>안녕하세요</div>
//   )
// }
//react 라이브러리에서 Component를 가져오는것이다.
export default class App extends Component {
  state = {
    todoData: [
      {
        id: "1",
        title: "공부하기",
        completed: false,
      },
      {
        id: "2",
        title: "청소하기",
        completed: false,
      },
    ],
    value: "",
  };

  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  //리액트에서 삼항연산자 많이 쓴다고 했음
  getstyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  handleClick = (id) => {
    //filter는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.
    let results = this.state.todoData.filter(
      (filterData) => filterData.id !== id
    );
    console.log("result", results);
    //hook을 안쓰고이렇게 바꿀수가 있네??
    this.setState({ todoData: results });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    //값을 추가하고
    //setState 다시하고

    //form안에 input을 전송할 때 페이지 리로드 되는걸 막아줌!!
    e.preventDefault();

    let newData = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    };
    this.setState({ todoData: [...this.state.todoData, newData] });
    this.setState({ value: "" });
  };

  handleChageComplete = (item) => {
    if (item.completed) {
      item.completed = false;
    } else {
      item.completed = true;
    }
    this.setState({ todoData: [...this.state.todoData] });
  };

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

          {/* 소스코드가 중복이 되기때문에 데이터를 받아서 map으로 처리하자(반복문) */}
          {this.state.todoData.map((item) => (
            // 여기서 map을 쓸경우에 key를 명시해주어야 한다!
            // 키는 요소변경 식별에 도움이 되기때문에 안정적인 ID를 부여하려면 key속성을 주어야 한다
            // 계속해서 경고가 뜨기 떄문에 가급적 명시하여 주자!!!
            // 키는 유니크한 값으로 해야 한다.
            <div style={this.getstyle(item.completed)} key={item.id}>
              <p>
                <input
                  type="checkbox"
                  defaultChecked={false}
                  onClick={() => this.handleComplete(item)}
                />
                {item.title}
                <button
                  style={this.btnStyle}
                  onClick={() => this.handleClick(item.id)}
                >
                  X
                </button>
              </p>
            </div>
          ))}
          <form style={{ display: "flex" }} onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="value"
              style={{ flex: "10", padding: "5px" }}
              placeholder="해야 할 일을 입력하세요"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="입력"
              className="btn"
              style={{ flex: "1" }}
            />
          </form>
        </div>
      </div>
    );
  }
}
