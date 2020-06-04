import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './tabs.module.css';
import Search from '../search/search';
import SeatSelect from '../seatSelection/seatSelect';
import Payment from '../payments/payment';
import Confirm from '../confirmation/confirm';


class Tabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tab: 1,
            busDetails: [],
            passengerDetails: []
        }
    }



    renderTabPanel = (tab) => {
        switch (tab) {
            case 1: return (
                <div><br />
                    <Search changeTab={this.handleTabChange} onBusDetails={this.handleBusDetails} />
                </div>
            )
            case 2: return (
                <div><SeatSelect value2={this.state.busDetails} changeTab={this.handleTabChange} value={this.state.busDetails} onPassengerDetails={this.handlePassDetails} /></div>
            )
            case 3: return (
                <div><Payment changeTab={this.handleTabChange} /></div>
            )
            case 4: return (
                <div><Confirm value={this.state.passengerDetails} /></div>
            )
            default: return null
        }
    }

    handleTabChange = (tabIdx) => {
        this.setState({
            tab: tabIdx
        })
    }

    handleBusDetails = (result) => {
        this.setState({
            busDetails: [...this.state.busDetails, result]
        })
    }

    handlePassDetails = (result) => {
        this.setState({
            passengerDetails: [...this.state.passengerDetails, result]
        })
    }

    render() {
        return (
            <div>
                <div id={styles.bg} className="container">
                    <ul id={styles.ul} className="nav nav-tabs">
                        <li id={styles.list} className="nav-item">
                            <a id={styles.a1} className={`nav-link ${this.state.tab === 1 ? 'active' : ''}`} href="#" >Plan Your Travel</a>
                        </li>
                        <li id={styles.list} className="nav-item">
                            <a id={styles.a1} className={classnames('nav-link', { active: this.state.tab === 2 })} href="#" >Select Your Seats</a>
                        </li>
                        <li id={styles.list} className="nav-item">
                            <a id={styles.a1} className={classnames('nav-link', { active: this.state.tab === 3 })} href="#" >Payments</a>
                        </li>
                        <li id={styles.list} className="nav-item">
                            <a id={styles.a1} className={classnames('nav-link', { active: this.state.tab === 4 })} href="#" > Ticket Confirmation</a>
                        </li>
                    </ul>
                    {this.renderTabPanel(this.state.tab)}
                </div>
            </div>
        );
    }
}

export default Tabs;