import React, {Component} from 'react';
import firebase from '../firebase/firebase.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CustomerDetails from '../CustomerDetails/CustomerDetails.jsx';

const db = firebase.firestore();

class CustomerList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isLoading: true,
            showModal: false,
            customers: [],
            toReturn: {},
        }
    }

    getcustomers() {
        fetch('https://biluthyrning.herokuapp.com/api/customer/read.php')
        .then(res => res.json()
            .then(json => json.data)
            .catch(err => console.log(err)
            ))
        .then(data => this.setState({customers: data, isLoading: false}))
        .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getcustomers()
        
        
    }

    handleReturn (finalOdometer){
        const customer = this.state.toReturn
        
        db.collection("customers").doc(customer.reference).set({
            returned: true,
            finalOdometer: finalOdometer,
            end: firebase.firestore.FieldValue.serverTimestamp(),
            totalDistance: finalOdometer - customer.initialOdometer,
        }, 
        {merge: true})
        .then(() => {
            this.getcustomers()
        })
        
        .then(() => {
            console.log('Car returned');
            this.toggleModal()
        }).catch((err) => console.error("Error returning car", err))
        this.setState({showModal: false})
    }

    closeModal() {
        this.setState({customer: {}, showModal: false})
    }

    openModal(customer){
        this.setState({customer: customer, showModal: true})
    }


    render() {
        const customers = this.state.customers.map(customer => (
            <tr>
            <td>{customer.firstname}</td>
            <td>{customer.lastname}</td>
            <td>{customer.ssn}</td>
            <td><Button onClick={this.openModal.bind(this, customer)}>Show Bookings</Button></td>
            </tr>
        ))
        return(
                <Container style={{marginTop: '10px'}}>
                {this.state.showModal && <CustomerDetails closeModal={this.closeModal.bind(this)} returnCar={this.handleReturn.bind(this)} customer={this.state.customer}/>}
                <Row><h1>Customers</h1></Row>
                <Col>
                    <Table bordered striped hover size="sm">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>SSN</th>
                        <th>Show Bookings</th>
                    </tr>
                    </thead>
                    <tbody>
                        {customers}
                    </tbody>
                    </Table>
                </Col>
                </Container>
        );
    }
}
export default CustomerList;