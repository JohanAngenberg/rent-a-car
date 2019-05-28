import React, {Component} from  'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            existingInput: true,
            ssnInput: '',
            firstName: '',
            validFirstName: false,
            firstNameError: 'Please enter First Name',
            lastName: '',
            validLastName: false,
            lastNameError: 'Please enter Last Name',
            lpInput: '',
            odometer: null,
            validSSN: false,
            showValidSSN: false,
            ssnError: '',
            validLP: false,
            showValidLP: false,
            lpError: 'Please enter Licence Plate',
            validOdo: false,
            showValidOdo: false,
            odoError: 'Please enter odometer value',
            submitControl: false
        }
    }

    handleRadioChange(e){
        this.setState({
            existingInput: e.target.value ==='true'
        }, () => this.checkSSN())
    }

    handleSubmitButton() {
        if(!this.state.existingInput) {
            if (this.state.firstName && this.state.lastName && this.state.lpInput && this.state.odometer && this.state.validSSN && this.state.showValidSSN) {
                return true
            } else {
                return false
            }
        } else{
            if (this.state.lpInput && this.state.odometer && this.state.validSSN && this.state.showValidSSN) {
                return true
            } else {
                return false
            }
        }
    }

    handleSSNChange(e) {
        this.setState({
            ssnInput: e.target.value
        }, () => {
            this.checkSSN()
        })  
    }

    handleFirstNameChange(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    handleLastNameChange(e) {
        this.setState({
            lastName: e.target.value
        })
    }

    handleLpChange(e) {
        this.setState({
            lpInput: e.target.value
        })
    }

    handleOdometerChange(e) {
        this.setState({
            odometer: parseInt(e.target.value)
        })
    }

    checkSSN() {
        let validateSSN = this.validateSSN(this.state.ssnInput)
        let ssn = this.state.ssnInput.replace('-', '')
        if (ssn.length === 12) {
            ssn = ssn.substring(2);
        }
        
        if(!validateSSN){
            this.setState({
                validSSN: false,
                showValidSSN: true,
                ssnError: 'Please enter a valid Social Security Number'});
        } else if (this.state.existingInput){
            if(this.props.customers.filter(c => c.ssn === ssn).length === 0) {
                this.setState({
                    validSSN: false,
                    showValidSSN: true,
                    ssnError: 'Customer does not exist'});
            } else {
                this.setState({validSSN: true, showValidSSN: true})
            }
            
        } else if (!this.state.existingInput){
            if(this.props.customers.filter(c => c.ssn === ssn).length !== 0) {
                this.setState({
                    validSSN: false,
                    showValidSSN: true,
                    ssnError: 'Customer already exists'})
                } else {
                    this.setState({
                        validSSN: true, showValidSSN: true
                    })
                }
            }
    }

    validateSSN(input) {
       // Check valid length & form
    if (!input) return false;

    if (input.indexOf('-') === -1) {
        if (input.length === 10) {
            input = input.slice(0, 6) + "-" + input.slice(6);
        } else {
            input = input.slice(0, 8) + "-" + input.slice(8);
        }
    }
    // eslint-disable-next-line
    if (!input.match(/^(\d{2})(\d{2})(\d{2})\-(\d{4})|(\d{4})(\d{2})(\d{2})\-(\d{4})$/)) return false;

    // Clean input
    input = input.replace('-', '');
    if (input.length === 12) {
        input = input.substring(2);
    }

    // Declare variables
    var d = new Date(((!!RegExp.$1) ? RegExp.$1 : RegExp.$5), (((!!RegExp.$2) ? RegExp.$2 : RegExp.$6)-1), ((!!RegExp.$3) ? RegExp.$3 : RegExp.$7)),
            sum = 0,
            numdigits = input.length,
            parity = numdigits % 2,
            i,
            digit;

    // Check valid date
    if (Object.prototype.toString.call(d) !== "[object Date]" || isNaN(d.getTime())) return false;

    // Check luhn algorithm
    for (i = 0; i < numdigits; i = i + 1) {
        digit = parseInt(input.charAt(i))
        if (i % 2 === parity) digit *= 2;
        if (digit > 9) digit -= 9;
        sum += digit;
    }
    return (sum % 10) === 0;
    };

    handleSubmit() {
        let ssn = this.state.ssnInput.replace('-', '')
        if (ssn.length === 12) {
            ssn = ssn.substring(2);
        }

        if(this.state.existingInput) {
            if (this.state.validSSN && this.state.showValidSSN && this.state.odometer && this.state.lpInput) {
                this.props.createBooking(ssn, this.state.lpInput, this.state.odometer)
            }
        } else {
            if(this.state.validSSN && this.state.showValidSSN && this.state.firstName && this.state.lastName && this.state.odometer && this.state.lpInput) {
                this.props.createCustomer(ssn, this.state.firstName, this.state.lastName)
                .then(res => res)
                .then(this.props.createBooking(ssn, this.state.lpInput, this.state.odometer))
                .catch(err => console.log(err))
            }
        }
    } 

    render() {
        return(
        <>
        <Modal show={true}>
            <Modal.Header>
                <Modal.Title>Book {this.props.cartype}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Group as={Row}>
                      <Col sm={5}>
                        <Form.Check
                          type="radio"
                          label="Existing Customer"
                          value={true}
                          onChange={this.handleRadioChange.bind(this)}
                          name="customerRadio"
                          id="existingCustomer"
                          defaultChecked
                        />
                        </Col>
                        <Col sm={5}>
                        <Form.Check
                          type="radio"
                          label="New Customer"
                          value={false}
                          onChange={this.handleRadioChange.bind(this)}
                          name="customerRadio"
                          id="newCustomer"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group onChange={this.handleSSNChange.bind(this)}>
                        <Form.Label>Social security number</Form.Label>
                        <Form.Control type="text" placeholder="Enter SSN" isInvalid={!this.state.validSSN && this.state.showValidSSN ? true : false} isValid={this.state.validSSN && this.state.showValidSSN ? true : false}/>
                        <Form.Control.Feedback type="invalid">
                        {this.state.ssnError}
                        </Form.Control.Feedback>    
                    </Form.Group>
                    {!this.state.existingInput ?
                    <>
                        <Form.Group onChange={this.handleFirstNameChange.bind(this)}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" isInvalid={!this.state.firstName} isValid={this.state.firstName}/>
                            <Form.Control.Feedback type="invalid">
                            {this.state.firstNameError}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group onChange={this.handleLastNameChange.bind(this)}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last Name" isInvalid={!this.state.lastName} isValid={this.state.lastName}/>
                            <Form.Control.Feedback type="invalid">
                            {this.state.lastNameError}
                            </Form.Control.Feedback>        
                        </Form.Group>
                    </>
                    : null}
                    <Form.Group onChange={this.handleLpChange.bind(this)}>
                        <Form.Label>Licence plate</Form.Label>
                        <Form.Control type="text" placeholder="Enter Licenceplate" isInvalid={!this.state.lpInput} isValid={this.state.lpInput}/>
                        <Form.Control.Feedback type="invalid">
                            {this.state.lpError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group onChange={this.handleOdometerChange.bind(this)}>
                        <Form.Label>Odometer</Form.Label>
                        <Form.Control type="number" placeholder="Enter Odometer" isInvalid={!this.state.odometer} isValid={this.state.odometer}/>
                        <Form.Control.Feedback type="invalid">
                        {this.state.odoError}
                        </Form.Control.Feedback>    
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.toggleModal.bind(this)}>
                    Close
                </Button>
                <Button variant={this.handleSubmitButton() ? "primary" : "danger" } onClick={this.handleSubmit.bind(this)}>
                    Create Booking
                </Button>
            </Modal.Footer>
        </Modal>
      </>
        );
    }

}


export default BookingModal;