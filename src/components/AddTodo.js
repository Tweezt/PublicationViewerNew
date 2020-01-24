import React, { Component } from 'react'
import { Form, Col } from 'react-bootstrap';


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
            <div>
                <Form.Row>
    {/* <Form.Group as={Col} controlId="formGridRadios">
    <Form.Label>Sort by: </Form.Label>
      <Form.Check inline label="Title" type="radio" id={`inline-radio-1`} />
      <Form.Check inline label="ISSN" type="radio" id={`inline-radio-2`} />
    </Form.Group> */}

    <Form.Group as={Col} controlId="formGridState">
    <Form.Label as="legend" column sm={4}>
        Point range
      </Form.Label>
      <Form.Control as="select">
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
    </Form.Group>

<Form.Group as={Col}>
      <Form.Label as="legend" column sm={2}>
        Radios
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          inline label="first radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
        <Form.Check
          type="radio"
          inline label="second radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
        <Form.Check
          type="radio"
          inline label="third radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
        />
      </Col>
    </Form.Group>
  </Form.Row>
                </div>
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
