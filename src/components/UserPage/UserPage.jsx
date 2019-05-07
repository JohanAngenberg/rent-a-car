import React, {Component} from 'react';
import firebase from '../firebase/firebase.js';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'

const db = firebase.firestore();

class MainWrapper extends Component {
    constructor (props) {
        super(props)
        this.state = {
            cars: [],
            isLoading: true,
            bookings: []
        }
    }

    componentDidMount() {
        const bookingsRef = []
        
        db.collection('bookings').get().then(snapshot => {
            let i = 0
            snapshot.docs.forEach(doc => {
                bookingsRef.push(doc.data())
                bookingsRef[i].reference = doc.id
            })
        }).then(() => this.setState({bookings: bookingsRef}))
        
    }
    render() {
        const bookings = this.state.bookings.map(booking => (
            <div>
            <div>{booking.car}</div>
            <div>{booking.user}</div>
            </div>
        ))
        return(
                <Container>
                {bookings}
                </Container>
        );
    }
}
export default MainWrapper;