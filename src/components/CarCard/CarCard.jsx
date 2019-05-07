import React, {Component} from 'react';
import firebase from '../firebase/firebase.js';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const db = firebase.firestore();

class CarCard extends Component {  
    constructor(props) {
        super(props)
        this.state = {
            showModal: false
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
                <Card.Img variant="top" src={this.props.car.img} />
                <Card.Body>
                    <Card.Title>{this.props.car.type}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                {!this.props.car.available && <ListGroup.Item>Not available</ListGroup.Item>}
                </ListGroup>
                {this.props.car.available &&
                <Card.Body>
                    <Card.Link 
                        onClick={this.handleRental.bind(this, 'Z6fTgis8MWH17zzR48eG', 'BoHXWKSb8zdCYfK1GUJC')} 
                        href="#">Rent Car
                    </Card.Link>
                 
                </Card.Body>}
            </Card>
        );
    }
}
export default CarCard
