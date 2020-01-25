import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { Row, Col, Form } from "react-bootstrap";
import Axios from "axios";

class PopupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      magazine: {
        _id: "",
        Title1: "",
        Title2: "",
        issn: "",
        issn2: "",
        e_issn: "",
        e_issn2: "",
        Points: [{ Year: "", Value: "" }],
        Categories: [""]
      }
    };
  }

  componentDidMount() {
    if (this.props.show) {
      Axios.get(`http://localhost:3000/magazines/${this.props.idpassed}`)
        // Axios.get(
        //   `http://publisher.freesher.ct8.pl/magazines/${this.props.idpassed}`
        // )
        .then(res => res.data)
        .then(data => {
          this.setState({ magazine: data });
        })
        .catch(err => console.error(err));
    }
  }
  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Publication details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Form>
              <Form.Group as={Row} controlId="formPlaintextId">
                <Form.Label column sm="2">
                  ID:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={this.state.magazine["_id"]}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextTitle">
                <Form.Label column sm="2">
                  Title:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={this.state.magazine.Title1}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextTitle">
                <Form.Label column sm="2">
                  Second Title:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={this.state.magazine.Title2}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextTitle">
                <Form.Label column sm="2">
                  ISSN:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={this.state.magazine.issn}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextTitle">
                <Form.Label column sm="2">
                  E-ISSN:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={this.state.magazine.e_issn}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextTitle">
                <Form.Label column sm="2">
                  ISSN2:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={this.state.magazine.issn2}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextTitle">
                <Form.Label column sm="2">
                  E-ISSN2:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={this.state.magazine.e_issn2}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextTitle">
                <Form.Label column sm="2">
                  Points:
                </Form.Label>
                <Col sm="10">
                  {this.state.magazine.Points.map(element => (
                    <p>{`Rok ${element.Year}  Wartość: ${element.Value}`}</p>
                  ))}
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextTitle">
                <Form.Label column sm="2">
                  Categories:
                </Form.Label>
                <Col sm="10">{this.state.magazine.Categories.join(", ")}</Col>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSubmit}>Add to favorites</Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default PopupModal;
