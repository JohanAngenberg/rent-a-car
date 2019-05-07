import React, {Component} from 'react';
import CarCard from '../CarCard/CarCard.jsx';
import firebase from '../firebase/firebase.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker} from 'react-dates';

const db = firebase.firestore();

class CarListings extends Component {
    constructor (props) {
        super(props) 
        this.state = {
            dummy: [
                {
                    licencePlate: 'abc123',
                    odometer: 126545,
                    type: 'Small Car',
                    img: 'https://media.whatcar.com/category-images/2019-01/smallcar.desktop2x.png',
                    available: true
                },
                {
                    licencePlate: 'hdc123',
                    odometer: 126545,
                    type: 'Small Car',
                    img: 'https://media.whatcar.com/category-images/2019-01/smallcar.desktop2x.png',
                    available: false
                },
                {
                    licencePlate: 'fff123',
                    odometer: 126545,
                    type: 'Small Car',
                    img: 'https://media.whatcar.com/category-images/2019-01/smallcar.desktop2x.png',
                    available: true
                },
                {
                    licencePlate: 'sss123',
                    odometer: 126545,
                    type: 'Small Car',
                    img: 'https://media.whatcar.com/category-images/2019-01/smallcar.desktop2x.png',
                    available: true
                },
                
            ],
            startDate: null,
            endDate: null,
            focusedInput: null,
            cars: [],
            activePage: 'browse'

        }
    }

    handlePage(page) {

    }
    

    componentDidMount() {
        const carsRef = []
        db.collection('cars').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                carsRef.push(doc.data())
            })
        }).then(() => this.setState({cars: carsRef, isLoading: false}))
        this.setState({
            cars: this.props.cars,
            isLoading: false
        })
    }


    render() {
        const cars = this.state.dummy
        .map((car) => (
                <CarCard key={car.licencePlate} car={car}/>
            ));
        console.log(cars);
        
        return(
            <Container>
                <Row><h1>Available Cars</h1></Row>
                <Row> <Col>
                <DateRangePicker
                    startDate={this.state.startDate}
                    startDateId="date_from"
                    endDate={this.state.endDate}
                    endDateId="date_to"
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                />
                </Col>
                </Row>

                {!this.state.isLoading ? 
                <Row>
                {cars}
                </Row> : <div>Loading</div>
                }
            </Container>
        );
    }
}

export default CarListings