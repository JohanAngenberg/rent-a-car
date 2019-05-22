import React, {Component} from  'react';
import firebase from '../firebase/firebase.js';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const moment = require('moment')

const db = firebase.firestore();

class ReturnModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookings: [],
            customer: '',
        }
    }

    
    handleOdometerChange(e) {
        this.setState({
            finalOdometer: e.target.value
        })
    }

    getBookings() {
        const bookingsRef = []
        db.collection('bookings').where("SSN", "==", this.props.customer.ssn)
        .get().then(snapshot => {
            let i = 0
            snapshot.docs.forEach(doc => {
                bookingsRef.push(doc.data())
                bookingsRef[i].reference = doc.id
                if (doc.data().end) {
                    let carData = this.props.cars.filter(car => car.type === doc.data().type)[0]
                    let startDate = moment(doc.data().start.toDate())
                    let endDate = moment(doc.data().end.toDate())
                    let duration = 1 + endDate.diff(startDate, 'days')
                    let distancePrice = carData.kmPrice * doc.data().totalDistance * carData.kmMultiplier;
                    let durationPrice = carData.baseDayRental * duration * carData.dayMultiplier;
                    
                    bookingsRef[i].duration = duration
                    bookingsRef[i].totalPrice = distancePrice + durationPrice 
                }
                i++
            })
        }).then(() => this.setState({bookings: bookingsRef}))
    }
    
    componentDidMount(){

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