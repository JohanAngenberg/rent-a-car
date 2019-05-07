import React, {Component} from 'react';
import firebase from '../firebase/firebase.js';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

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

    handleRental(car, user) {
        db.collection("bookings").doc().set({
            car: `${car}`,
            user: `${user}`,
            returned: false,
            start: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2018")),
            end: firebase.firestore.Timestamp.fromDate(new Date("December 14, 2018"))
        })
    }

    render() {
        return (
            <Card style={{ width: '18rem', margin: '10px' }}>
                <div style={{height: "200px"}}>
                <Card.Img variant="top" src={this.props.car.img}/>
                </div>
                <Card.Body>
                    <Card.Title>{this.props.car.type}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Base day rental: {this.props.car.baseDayRental}$ </ListGroup.Item>
                    <ListGroup.Item>Price per km: {this.props.car.kmPrice}$</ListGroup.Item>
                    <ListGroup.Item>Estimated price: {this.props.car.baseDayRental * this.props.duration}$</ListGroup.Item>
                </ListGroup>
                <Card.Body onClick={this.handleRental.bind(this, 'Z6fTgis8MWH17zzR48eG', 'BoHXWKSb8zdCYfK1GUJC')}>
                    <Card.Link 
                        href="#">Rent Car
                    </Card.Link>
                </Card.Body>
            </Card>
        );
    }
}
export default CarCard
