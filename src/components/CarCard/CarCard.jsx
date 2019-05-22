import React, {Component} from 'react';
import firebase from '../firebase/firebase.js';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import BookingModal from '../BookingModal/BookingModal.jsx';


const moment = require('moment');

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
        let dateTime = moment();
        let data = {
            customer_ssn: ssn,
            booking_licenceplate: plate,
            booking_cartype: this.props.car.name,
            booking_start: dateTime,
            booking_initial_odo: odometer
        }
        console.log(JSON.stringify(data));
        
        fetch('https://biluthyrning.herokuapp.com/api/booking/create.php', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then(() => this.toggleModal())
        .catch(err => console.log(err))
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
                    <Card.Title>{this.props.car.name}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Base day rental: {this.props.car.baseDayRental * this.props.car.dayMultiplier}$ </ListGroup.Item>
                    <ListGroup.Item>Price per km: {this.props.car.kmPrice * this.props.car.kmMultiplier}$</ListGroup.Item>
                    <ListGroup.Item>Estimated price: {this.props.car.baseDayRental * this.props.duration * this.props.car.dayMultiplier}$</ListGroup.Item>
                </ListGroup>
                {this.props.user ? <Card.Body onClick={this.toggleModal.bind(this)}>
                    <Card.Link 
                        href="#">Rent Car
                    </Card.Link>
                    </Card.Body>
                : <Card.Body>
                    <Card.Link 
                        href="#">Login to create booking
                    </Card.Link>
                </Card.Body>}
            </Card>
            </>
        );
    }
}
export default CarCard
