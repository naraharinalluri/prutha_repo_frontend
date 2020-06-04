import React, { Component } from 'react';
import axios from 'axios';
import styles from './home.module.css'

class Home extends Component {

    handleSubmit = () => {

        const authToken = sessionStorage.getItem('authToken') || ''
        axios.get('/home', {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then(response => window.location.href = "/logindone")
    }

    render() {
        return (
            <div className="jumbotron">
                <h3>WELCOME TO BUS BOOKING SYSTEM</h3><br /><br />
                <button className="btn btn-primary btn-lg" onClick={e => { e.preventDefault(); this.handleSubmit(); }} >START BOOKING</button>
            </div>
        );
    }
}

export default Home;