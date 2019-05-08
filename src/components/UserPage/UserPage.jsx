import React, {Component} from 'react';
import firebase from '../firebase/firebase.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ReturnModal from '../ReturnModal/ReturnModal.jsx';

const moment = require('moment')

const db = firebase.firestore();

class MainWrapper extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isLoading: true,
            showModal: false,
            bookings: [],
            toReturn: {},
        }
    }

    getBookings() {
        const bookingsRef = []
        db.collection('bookings').get().then(snapshot => {
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
                
            })
        }).then(() => this.setState({bookings: bookingsRef}))
    }

    componentDidMount() {
        this.getBookings()
        
        
    }

    handleReturn (finalOdometer){
        const booking = this.state.toReturn
        
        db.collection("bookings").doc(booking.reference).set({
            returned: true,
            finalOdometer: finalOdometer,
            end: firebase.firestore.FieldValue.serverTimestamp(),
            totalDistance: finalOdometer - booking.initialOdometer,
        }, 
        {merge: true})
        .then(() => {
            this.getBookings()
        })
        
        .then(() => {
            console.log('Car returned');
            this.toggleModal()
        }).catch((err) => console.error("Error returning car", err))
        this.setState({showModal: false})
    }

    closeModal() {
        this.setState({toReturn: {}, showModal: false})
    }

    openModal(booking){
        this.setState({toReturn: booking, showModal: true})
    }


    render() {
        const bookings = this.state.bookings.map(booking => (
            <tr>
            <td>{booking.reference}</td>
            <td>{booking.ssn}</td>
            <td>{booking.licenceplate}</td>
            <td>{booking.type}</td>
            <td>{booking.start.toDate().toString()}</td>
            <td>{booking.end ? booking.end.toDate().toString() : 'not returned'}</td>
            <td>{booking.initialOdometer}</td>
            <td>{booking.finalOdometer ? booking.finalOdometer : 0}</td>
            <td>{booking.duration ? booking.duration : 0}</td>
            <td>{booking.totalDistance ? booking.totalDistance : 0}</td>
            <td>{booking.totalPrice ? booking.totalPrice: 0}$</td>
            <td>{!booking.returned ? <Button onClick={this.openModal.bind(this, booking)}>Return</Button>: 'Returned'}</td>
            </tr>
        ))
        return(
                <Container style={{marginTop: '10px'}}>
                {this.state.showModal && <ReturnModal closeModal={this.closeModal.bind(this)} returnCar={this.handleReturn.bind(this)} booking={this.state.toReturn}/>}
                <Row><h1>Bookings</h1></Row>
                    <Table bordered striped hover size="sm">
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
                </Container>
        );
    }
}
export default MainWrapper;