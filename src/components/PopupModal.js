import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Row, Col, Form } from 'react-bootstrap';

class PopupModal extends Component{
  //  constructor(props){
  //      super(props);
  //  }

  handleSubmit( event ){
    event.preventDefault();
  }

    render(){
        return(
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
            {/* <Row>
              <Col sm={6}>
              ID: {this.props.idpassed}
              </Col>
            </Row>
            
            <Row>
              <Col sm={6}>
              ID: {this.props.idpassed}
              </Col>
            </Row> */}

            <Form>
              <Form.Group as={Row} controlId="formPlaintextId">
                <Form.Label column sm="2">
                  ID: 
                </Form.Label>
                <Col sm="10">
                  <Form.Control plaintext readOnly defaultValue={this.props.idpassed} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextTitle">
                <Form.Label column sm="2">
                  Title: 
                </Form.Label>
                <Col sm="10">
                  <Form.Control plaintext readOnly defaultValue={this.props.idpassed} />
                </Col>
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