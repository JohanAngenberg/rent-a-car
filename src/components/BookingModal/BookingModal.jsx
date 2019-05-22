import React, {Component} from  'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ssnInput: '',
            lpInput: '',
            odometer: null,
        }
    }

    handleSSNChange(e) {
        this.setState({
            ssnInput: e.target.value
        })
    }
    handleLpChange(e) {
        this.setState({
            lpInput: e.target.value
        })
    }

    handleOdometerChange(e) {
        this.setState({
            odometer: parseInt(e.target.value)
        })
    }

    render() {
        return(
        <>
        <Modal show={true}>
            <Modal.Header>
                <Modal.Title>Book {this.props.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group onChange={this.handleSSNChange.bind(this)}>
                        <Form.Label>Social security number</Form.Label>
                        <Form.Control type="text" placeholder="Enter SSN" />
                    </Form.Group>
                    <Form.Group onChange={this.handleLpChange.bind(this)}>
                        <Form.Label>Licence plate</Form.Label>
                        <Form.Control type="text" placeholder="Enter Licenceplate" />
                    </Form.Group>
                    <Form.Group onChange={this.handleOdometerChange.bind(this)}>
                        <Form.Label>Odometer</Form.Label>
                        <Form.Control type="number" placeholder="Enter Odometer" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.toggleModal.bind(this)}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.props.createBooking.bind(this, this.state.ssnInput, this.state.lpInput, this.state.odometer)}>
                    Create Booking
                </Button>
            </Modal.Footer>
        </Modal>
      </>
        );
    }

}


export default BookingModal;