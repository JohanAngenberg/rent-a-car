import React, {Component} from  'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailInput: '',
            passInput: ''
        }
    }

    handleLoginChange(e) {
        this.setState({
            emailInput: e.target.value
        })
    }
    handlePassChange(e) {
        this.setState({
            passInput: e.target.value
        })
    }

    render() {
        return(
        <>
        <Modal show={true}>
            <Modal.Header>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail" onChange={this.handleLoginChange.bind(this)}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" onChange={this.handlePassChange.bind(this)}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.toggleSignUp.bind(this)}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.props.signUpUser.bind(this, this.state.emailInput, this.state.passInput)}>
                    Sign Up
                </Button>
            </Modal.Footer>
        </Modal>
      </>
        );
    }

}


export default Login;