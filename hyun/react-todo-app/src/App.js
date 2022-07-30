import React from "react";
import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")):[];

export default function App(){
  console.log('app in rendered');
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");


  let handleRemoveClick = ()=>{
    setTodoData([]);
    localStorage.setItem("todoData",JSON.stringify([]));
  }

  let handleSubmit = (e) =>{
    e.preventDefault();

    let newTodo = {
      id : Date.now(),
      title : value,
      completed : false
    }

    setTodoData(prev => [...prev,newTodo]);
    localStorage.setItem("todoData",JSON.stringify([...todoData,newTodo]));
    setValue("");
  }


  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-50">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>To Do List</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>

      <Form value={value} setValue={setValue} handleSubmit={handleSubmit}></Form>
      <Lists todoData={todoData} setTodoData={setTodoData}></Lists>
      </div>
    </div>
  );

}