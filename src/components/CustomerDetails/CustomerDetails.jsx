import React, {Component} from  'react';
import firebase from '../firebase/firebase.js';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ReturnModal from '../ReturnModal/ReturnModal.jsx';

const moment = require('moment')

class CustomerDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookings: [],
            customer: {},
            toReturn:{}
        }
    }

    handleReturn (finalOdometer){
        const booking = this.state.toReturn;
        
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = moment();
        let distance = finalOdometer - booking.initial_odo;
        let duration = 1 + dateTime.diff(booking.start, 'days');
        let distancePrice = booking.kmprice * distance * booking.kmMultiplier;
        let durationPrice = booking.baseDayRental * duration * booking.dayMultiplier;

        let data = {
            booking_id: booking.id,
            booking_end: dateTime,
            booking_final_odo: finalOdometer,
            booking_distance: distance,
            duration: duration,
            booking_price: distancePrice + durationPrice,
            returned: true,
        }

        console.log(data);
        
        
        fetch('https://biluthyrning.herokuapp.com/api/booking/update.php', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => console.log(res))
        .then(() => this.toggleModal())
        .then(() => {
            this.getBookingsByCustomer(this.props.customer.ssn)
        })
        .catch(err => console.log(err))
        .then(() => {
            this.getBookingsByCustomer(this.props.customer.ssn)
        })
        
        .then(() => {
            console.log('Car returned');
            this.closeModal()
            this.getBookingsByCustomer(this.props.customer.ssn)
        }).catch((err) => console.error("Error returning car", err))
    }

    closeModal() {
        this.setState({toReturn: {}, showModal: false})
    }

    openModal(booking){
        this.setState({toReturn: booking, showModal: true})
    }

    
    handleOdometerChange(e) {
        this.setState({
            finalOdometer: e.target.value
        })
    }

    getBookingsByCustomer(ssn) {

        fetch(`https://biluthyrning.herokuapp.com/api/booking/readcustomer.php?customer_ssn=${ssn}`)
        .then(res => res.json()
            .then(json => json.data)
            .catch(err => console.log(err)
            ))
        .then(data => this.setState({bookings: data}))
        .catch(err => console.log(err))
    }
    
    componentDidMount(){
        this.getBookingsByCustomer(this.props.customer.ssn)
    }

    render() {
        const bookings = this.state.bookings.map(booking => (
            <tr>
            <td>{booking.id}</td>
            <td>{booking.ssn}</td>
            <td>{booking.licenceplate}</td>
            <td>{booking.cartype}</td>
            <td>{booking.start}</td>
            <td>{booking.end ? booking.end : 'not returned'}</td>
            <td>{booking.initial_odo}</td>
            <td>{booking.final_odo ? booking.final_odo : 0}</td>
            <td>{booking.duration ? booking.duration : 0}</td>
            <td>{booking.distance ? booking.distance : 0}</td>
            <td>{booking.price ? booking.price: 0}$</td>
            <td>{!booking.returned ? <Button onClick={this.openModal.bind(this, booking)}>Return</Button>: 'Returned'}</td>
            </tr>
        ))
        return(
        <>
        {this.state.showModal && <ReturnModal closeModal={this.closeModal.bind(this)} returnCar={this.handleReturn.bind(this)} booking={this.state.toReturn}/>}
        <Modal show={!this.state.showModal}  size='xl'>
            <Modal.Header>
                <Modal.Title>Bookings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table responsive striped hover size="sm" >
                    <thead>
                    <tr>
                        <th>Booking Reference</th>
                        <th>Customer</th>
                        <th>Car</th>
                        <th>Car Type</th>
                        <th>Start time</th>
                        <th>Returned time</th>
                        <th>Odometer Start</th>
                        <th>Odometer End</th>
                        <th>Number of Days</th>
                        <th>Total Distance</th>
                        <th>Total Price</th>
                        <th>Return Car</th>
                    </tr>
                    </thead>
                    <tbody>
                        {bookings}
                    </tbody>
                    </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.closeModal.bind(this)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
      </>
        );
    }

}


export default CustomerDetails;