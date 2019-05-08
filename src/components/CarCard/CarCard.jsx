import React, {Component} from 'react';
import firebase from '../firebase/firebase.js';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import BookingModal from '../BookingModal/BookingModal.jsx'

const db = firebase.firestore();

class CarCard extends Component {  
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            price: 0,
            total: 0
        }
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal})
    }

    handleBooking(ssn, plate, odometer) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        
        db.collection("bookings").doc().set({
            ssn: `${ssn}`,
            licenceplate: `${plate}`,
            initialOdometer: odometer,
            type: this.props.car.type,
            returned: false,
            start: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            console.log('Booking Created');
            this.toggleModal()
        }).catch((err) => console.error("Error creating Booking", err))
    }

    render() {
        return (
            <>
            {this.state.showModal && <BookingModal toggleModal={this.toggleModal.bind(this)} createBooking={this.handleBooking.bind(this)} />}
            <Card style={{ width: '18rem', margin: '10px' }}>
                <div style={{height: "200px"}}>
                <Card.Img variant="top" src={this.props.car.img}/>
                </div>
                <Card.Body>
                    <Card.Title>{this.props.car.type}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Base day rental: {this.props.car.baseDayRental * this.props.car.dayMultiplier}$ </ListGroup.Item>
                    <ListGroup.Item>Price per km: {this.props.car.kmPrice * this.props.car.kmMultiplier}$</ListGroup.Item>
                    <ListGroup.Item>Estimated price: {this.props.car.baseDayRental * this.props.duration * this.props.car.dayMultiplier}$</ListGroup.Item>
                </ListGroup>
                <Card.Body onClick={this.toggleModal.bind(this)}>
                    <Card.Link 
                        href="#">Rent Car
                    </Card.Link>
                </Card.Body>
            </Card>
            </>
        );
    }
}
export default CarCard
