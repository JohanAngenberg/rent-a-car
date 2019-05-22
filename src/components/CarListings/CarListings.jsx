import React, {Component} from 'react';
import CarCard from '../CarCard/CarCard.jsx';
import firebase from '../firebase/firebase.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
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
            duration: 0,
            distance: 0,
            showType: '',
            cars: [],
            activePage: 'browse'

        }
    }
    

    componentDidMount() {

        fetch('https://biluthyrning.herokuapp.com/api/car/read.php')
        .then(res => res.json()
            .then(json => json.data)
            .catch(err => console.log(err)
            ))
        .then(data => this.setState({cars: data, isLoading: false}))
        .then(() => this.props.updateCars(this.state.cars))
        .catch(err => console.log(err))
    }

    handleDatesChange (startDate, endDate) {
        let duration = 0
        if (startDate !== null && endDate !== null) {
            duration = endDate.diff(startDate, 'days')
        }
        this.setState({duration})
        
    }

    handleChangeType (e) {
        this.setState({showType: e.target.value})
    }


    render() {

        const cars = this.state.cars
        .filter(car => this.state.showType === '' ? car : (car.name === this.state.showType))
        .map((car) => (
                <CarCard user={this.props.user} key={car.licencePlate} car={car} duration={this.state.duration}/>
            ));
        
        return(
            <Container>
                <Row><h1>Available Cars</h1></Row>
                <Row> <Col>
                <DateRangePicker
                    startDate={this.state.startDate}
                    startDateId="date_from"
                    endDate={this.state.endDate}
                    endDateId="date_to"
                    onDatesChange={({ startDate, endDate }) => {this.handleDatesChange(startDate, endDate); this.setState({ startDate, endDate })}}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                />
                </Col>
                <Col>
                <Form.Group onChange={this.handleChangeType.bind(this)} controlId="selectType">
                        <Form.Control style={{height: '49px'}} as="select">
                            <option value=''>Show All</option>
                            <option value='Small Car'>Small Car</option>
                            <option value='Van'>Van</option>
                            <option value='Minibus'>Minibus</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group onChange={this.handleChangeType.bind(this)} controlId="selectType">
                        <Form.Control style={{height: '49px'}} as="select">
                            <option value=''>Show All</option>
                            <option value='Small Car'>Small Car</option>
                            <option value='Van'>Van</option>
                            <option value='Minibus'>Minibus</option>
                        </Form.Control>
                    </Form.Group>
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