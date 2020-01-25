import React, { Component } from "react";
import { Form, Col } from "react-bootstrap";

export class FilterMagazine extends Component {
  state = {
    title: undefined,
    minPoints: undefined,
    maxPoints: undefined
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("State filtermagazine", this.state);
    this.props.searchMagazines({
      title: this.state.title,
      minPoints: this.state.minPoints,
      maxPoints: this.state.maxPoints
    });
  };

  onChange = e => this.setState({ title: e.target.value });
  onChangeRange = e => {
    const option = e.target.options[e.target.selectedIndex].value;

    if (option !== "") {
      const options = option.split(" ");

      this.setState({ minPoints: options[0], maxPoints: options[1] });
    } else {
      this.setState({ minPoints: undefined, maxPoints: undefined });
    }
  };

  render() {
    return (
      <div>
        <div>
          <Form.Row>
            {/* <Form.Group as={Col} controlId="formGridRadios">
    <Form.Label>Sort by: </Form.Label>
      <Form.Check inline label="Title" type="radio" id={`inline-radio-1`} />
      <Form.Check inline label="ISSN" type="radio" id={`inline-radio-2`} />
    </Form.Group> */}

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Point range: </Form.Label>
              <Form.Control as="select" onChange={this.onChangeRange}>
                <option value="">Choice..</option>
                <option value="0 39">0-39</option>
                <option value="40 79">40-79</option>
                <option value="80 119">80-119</option>
                <option value="120 140">120-140</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label as="legend" column sm={2}>
                Radios
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="first radio"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="second radio"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="radio"
                  label="third radio"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
          </Form.Row>
        </div>
        <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
          <input
            type="text"
            name="title"
            style={{ flex: "10", padding: "5px" }}
            placeholder="Search..."
            value={this.state.title}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn"
            style={{ flex: "1" }}
          />
        </form>
      </div>
    );
  }
}

export default FilterMagazine;
