import React, { Component } from "react";
import PropTypes from "prop-types";

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
          <div style={(row2Style, rowMainStyle)}>kolumna 2</div>
          <div style={(row2Style, rowMainStyle)}>kolumna 3</div>
        </div>
        <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>
          Open
        </button>
      </div>
    );
  }
}

// proptypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired
};

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
