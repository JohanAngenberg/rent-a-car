import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import BookingModal from '../BookingModal/BookingModal.jsx';


const moment = require('moment');

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

    handleClickCalendar(){
        this.props.showCalendar()
    }

    handleBooking(ssn, plate, odometer) {
        let customersCheck = this.props.customers.filter(c => c.ssn === ssn)
        let dateTime = moment();
        let data = {
            customer_ssn: ssn,
            booking_licenceplate: plate,
            booking_cartype: this.props.car.name,
            booking_start: dateTime,
            booking_initial_odo: odometer,

        }
        if (ssn && plate && odometer) {
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
    }

    handleBooking = this.handleBooking.bind(this)

    render() {
        return (
            <>
            {this.state.showModal && <BookingModal createCustomer={this.props.createCustomer} cartype={this.props.car.name} customers={this.props.customers} toggleModal={this.toggleModal.bind(this)} createBooking={this.handleBooking} />}
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
                {this.props.user ? <Card.Body>
                    <Card.Link onClick={this.handleClickCalendar.bind(this)}
                        href="#">Check Availability
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
