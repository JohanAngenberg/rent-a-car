import React, {Component} from  'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'

class ToolBar extends Component {
    constructor (props) {
        super(props)
        this.state = {
            expanded: false,
            activePage:''            
        }
    }


    handleExpand () {
        this.setState({
            expanded: !this.state.expanded
        })
    }
    render () {
        return (

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Rent a Car</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link onClick={this.props.changePage.bind(this,'browse')} href="#">Browse Cars</Nav.Link>
                {this.props.user && <Nav.Link onClick={this.props.changePage.bind(this,'bookings')} href="#">Bookings</Nav.Link>}
              </Nav>
              <Nav>
                {!this.props.user && <Nav.Link onClick={this.props.toggleLogin.bind(this)} href="#">Sign In</Nav.Link>}
                {!this.props.user && <Nav.Link onClick={this.props.toggleSignUp.bind(this)} href="#">Sign Up</Nav.Link>}
                {this.props.user && <Nav.Link onClick={this.props.signOut.bind(this)} href="#">Sign Out</Nav.Link>}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        
        );
    }
}

export default ToolBar;