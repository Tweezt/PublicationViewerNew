import React, { Component } from 'react'

export class AddTodo extends Component {
    state = {
        title: ''
    }

onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: ''});
}

onChange = (e) => this.setState({[e.target.name]: e.target.value});

    render() {
        return (
            <div>
            <form onSubmit={this.onSubmit} style={{ display: 'flex'}}>
                <input 
                type="text"
                name="title" 
                style={{flex: '10', padding: '5px'}}
                placeholder="Search..."
                value={this.state.title}
                onChange={this.onChange}
                />
                <input 
                type="submit" 
                value="Search"
                className="btn"
                style={{flex: '1'}}
                />
            
            </form>
                <div style={columnStyle}>
            <div style={(rowStyle, rowMainStyle)}><b>Title</b></div>
            <div style={(row2Style, rowMainStyle)}><b>Points</b></div>
            <div style={(row2Style, rowMainStyle)}><b>ISSN</b></div>
            <div style={(row2Style, rowMainStyle)}><b>e-ISSN</b></div>
                </div>
            </div>
        )
    }
}

const rowMainStyle = {
    padding: "10px"
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


export default AddTodo
