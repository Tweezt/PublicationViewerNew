import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
//import { Row, Col, Form } from 'react-bootstrap';

class PopupModal extends Component{
  //  constructor(props){
  //      super(props);
  //  }

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
          Tytuł
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
            ID: {this.props.idPassed}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        );
    }

}
export default PopupModal;