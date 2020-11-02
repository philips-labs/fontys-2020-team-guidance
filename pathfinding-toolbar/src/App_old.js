import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

export default class ToDoDragDropDemo extends Component {
  
    state = {
      tasks: [
        {id: "1", taskName:"Read book",type:"inHotbar", backgroundColor: "red"},
        {id: "2", taskName:"Pay bills", type:"inHotbar", backgroundColor:"green"},
        {id: "3", taskName:"Go to the gym", type:"Done", backgroundColor:"blue"},
        {id: "4", taskName:"Play baseball", type:"Done", backgroundColor:"green"}
      ]
      
    }

  

onDragStart = (event, taskName) => {
  console.log('dragstart on div: ', taskName);
  event.dataTransfer.setData("taskName", taskName);
}
onDragOver = (event) => {
  event.preventDefault();
}

onDrop = (event, cat) => {
  let taskName = event.dataTransfer.getData("taskName");

  let tasks = this.state.tasks.filter((task) => {
      if (task.taskName === taskName) {
          task.type = cat;
      }
      return task;
  });

  this.setState({
      ...this.state,
      tasks
  });
}

  render() {
    var tasks = {
      inHotbar: [],
      Done: []
    }

  this.state.tasks.forEach ((task) => {
    tasks[task.type].push(
      <div key={task.id} 
        onDragStart = {(event) => this.onDragStart(event, task.taskName)}
        draggable
        className="draggable"
        style = {{backgroundColor: task.bgcolor}}>
        {task.taskName}
      </div>
    );
  });

    return (
      <div className="drag-container">
        <h2 className="head">Hotbar Drag & Drop</h2>
      <div className="inHotbar"
        onDragOver={(event)=>this.onDragOver(event)}
          onDrop={(event)=>{this.onDrop(event, "inHotbar")}}>
          <span className="group-header">Hotbar</span>
          {tasks.inHotbar}
        </div>

        <div className="droppable"
          onDragOver={(event)=>this.onDragOver(event)}
            onDrop={(event)=>this.onDrop(event, "Done")}>
          <span className="group-header">Heatmap</span>
          {tasks.Done}
        </div>	     

        
      </div>
    );
  }
}