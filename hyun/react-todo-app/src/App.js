import React, { Component } from "react";
import "./App.css";

export default class App extends Component {

  state = {
    todoData : [
      {
        id: "1",
        title: "공부하기",
        completed: false
      },
      {
        id: "2",
        title: "청소하기",
        completed: true
      },
    ],
    value:""

  }
  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }

  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed?"line-through":"none"
    }
  }

  handleClick = (id)=>{
    let newTodoData = this.state.todoData.filter((data)=>{
      return data.id !== id;
    })
    this.setState({todoData:newTodoData})
  }

  handleChange = (e)=>{
    this.setState({value:e.target.value})
  }

  handleSubmit = (e) =>{
    e.preventDefault();

    let newTodo = {
      id : Date.now(),
      title : this.state.value,
      completed : false
    }

    this.setState({todoData:[...this.state.todoData,newTodo],value:""})
  }

  handleCompletChange = (id) => {
    let newTodoData = this.state.todoData.map(data=>{
      if(data.id === id){
        data.completed = !data.completed;
      }
      return data
    })
    this.setState({todoData:newTodoData})
  }

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>To Do List</h1>
          </div>

        <form style={{display:'flex'}}>
          <input
            type="text"
            name="value"
            style={{flex:'10',padding:'5px'}}
            placeholder="input To do"
            value={this.state.value}
            onChange={this.handleChange}>
          </input>
          <input type="submit" value="input" className="btn" onClick={this.handleSubmit}></input>
        </form>

          {this.state.todoData.map((data) => (
            <div style={this.getStyle(data.completed)} key={data.id} >
              <input type="checkbox" defaultChecked={data.completed} onChange={()=>this.handleCompletChange(data.id)} />
              {data.title}
              <button style={this.btnStyle} onClick={()=>this.handleClick(data.id)} >x</button>
            </div>

          ))}
        </div>
      </div>
    )
  }
}