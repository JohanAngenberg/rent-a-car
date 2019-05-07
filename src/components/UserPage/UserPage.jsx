import React, {Component} from 'react';
import firebase from '../firebase/firebase.js';

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
            snapshot.docs.forEach(doc => {
                bookingsRef.push(doc.data())
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

                <div className="userPageWrapper">
                {bookings}
                </div> 
        );
    }
}
export default MainWrapper;