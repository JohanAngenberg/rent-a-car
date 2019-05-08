import React, {Component} from 'react';
import Toolbar from '../Toolbar/Toolbar.jsx'
import CarListings from '../CarListings/CarListings.jsx'
import Login from '../Login/Login.jsx'
import SignUp from '../SignUp/SignUp.jsx'
import UserPage from '../UserPage/UserPage.jsx'
import firebase from '../firebase/firebase.js';
import Container from 'react-bootstrap/Container';


const db = firebase.firestore();
const auth = firebase.auth();
const user = firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      return 'test'
    } else {
        return ''
    }
  });

class MainWrapper extends Component {
    constructor (props) {
        super(props)
        this.state = {
            cars: [],
            isLoading: true,
            user: '',
            activePage: 'browse',
            showLogin: false,
            showSignUp: false
        }
    }

    handleChangePage (e) {
        this.setState({activePage: e})
    }

    handleToggleLogin(){
        this.setState({showLogin: !this.state.showLogin})
    }

    handleToggleSignUp(){
        this.setState({showSignUp: !this.state.showSignUp})
    }

    handleLogin(email, password) {
        auth.signInWithEmailAndPassword(email, password)
        .then(this.setState({currentUser: user}))
        .catch(function(error) {
            console.log(error.message);
          })
        this.setState({showLogin: false})
    }

    handleSignUp(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            console.log(error.message);
          })
        this.setState({showSignUp: false})
    }

    handleSignOut() {
        auth.signOut()
    }

    updateCars(cars) {
        this.setState({cars})
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
              this.setState({user: user.email})
            } else {
                this.setState({user: null})
            }
          })
    }
    render() {
        return(
            <div>
            <Toolbar toggleLogin={this.handleToggleLogin.bind(this)}
                 toggleSignUp={this.handleToggleSignUp.bind(this)} 
                 changePage={this.handleChangePage.bind(this)}
                 signOut={this.handleSignOut.bind(this)}
                 user={this.state.user}
            />
            <Container>
                
                {this.state.showLogin ?
                <Login 
                toggleLogin={this.handleToggleLogin.bind(this)}
                loginUser={this.handleLogin.bind(this)}
                /> : null}
                {this.state.showSignUp ?
                <SignUp 
                toggleSignUp={this.handleToggleSignUp.bind(this)}
                signUpUser={this.handleSignUp.bind(this)}
                /> : null}
                {this.state.activePage === 'browse' && <CarListings user={this.state.user} updateCars={this.updateCars.bind(this)}/>}
                {this.state.activePage === 'bookings' && <UserPage cars={this.state.cars}/>}
            </Container>
            </div>
        );
    }
}
export default MainWrapper;