import React, {Component} from  'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const moment = require('moment')

class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            today: ''
        }
    }

    render(){
        let CalendarStyles = {
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridAutoRows: 'minmax(50px, auto)',
            width: '90%'       
        }
        let WeekStyles = {
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gridAutoFlow: 'dense',
            gridGap: '2px 10px'
        }
        return(
        <div style={CalendarStyles}>
            <div style={WeekStyles}>
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
                <div>Sunday</div>
            </div>
        </div>
        )}
}

export default Calendar;
