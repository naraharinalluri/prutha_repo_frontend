import React, { Component } from 'react';
import Register from './components/register/register';
import styles from './home.module.css';

class Index extends Component {
    render() {
        return (
            <div >
                <Register />
            </div>
        );
    }
}

export default Index;