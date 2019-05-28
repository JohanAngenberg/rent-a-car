import React, {Component} from  'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class ReturnModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ssnInput: '',
            lpInput: '',
            finalOdometer: null,
        }
    }

    handleOdometerChange(e) {
        this.setState({
            finalOdometer: e.target.value
        })
    }

    render() {
        return(
        <>
        <Modal show={true}>
            <Modal.Header>
                <Modal.Title>Return {this.props.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group onChange={this.handleOdometerChange.bind(this)}>
                        <Form.Label>Odometer after rental</Form.Label>
                        <Form.Control type="number" placeholder="Enter Odometer" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.closeModal.bind(this)}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.props.returnCar.bind(this, this.state.finalOdometer)}>
                    Return Car
                </Button>
            </Modal.Footer>
        </Modal>
      </>
        );
    }

}


export default ReturnModal;