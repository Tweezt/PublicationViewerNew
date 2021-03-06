import React, { Component } from "react";

export class TodoItem extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      //padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.todo.completed ? "line-through" : "none",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    };
  };

  render() {
    const { id, title } = this.props.todo;
    return (
      <div style={this.getStyle()}>
        <input
          style={checkboxStyle}
          type="checkbox"
          onChange={this.props.markComplete.bind(this, id)}
        />
        <div style={columnStyle}>
          <div style={(rowStyle, rowMainStyle)}>{title}</div>
          <div style={(row2Style, rowMainStyle)}>punkty</div>
          <div style={(row2Style, rowMainStyle)}>issn</div>
          <div style={(row2Style, rowMainStyle)}>e-issn</div>
        </div>
        <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>
          Open
        </button>
      </div>
    );
  }
}

const rowMainStyle = {
  padding: "10px"
};

const btnStyle = {
  background: "#555",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "30%",
  cursor: "pointer"
  //   float: "right"
};

const columnStyle = {
  //   display: "inline"
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
};

const rowStyle = {
  // float: "left",
  //   width: "50%"
};
const row2Style = {
  //   float: "left",
  //   width: "20%"
};

const checkboxStyle = {
  //   float: "left",
  //   width: "10px"
};

export default TodoItem;
