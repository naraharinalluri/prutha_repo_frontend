import React, { Component } from 'react';
import styles from './confirm.modules.css';

class Confirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: [this.props.value],
        }
    }

    handleSubmit = e => {
        window.location.href = "/login"
    }

    renderList = () => {
        const data = this.state.details[0]
        return data[0].map((item, idx) => {

            return (
                <div key={idx}>
                    <h4>Passenger {idx + 1} Details</h4>
                    <table className="table table-hover">
                        <tr>
                            <td>Seat Number</td>
                            <td>
                                <h6>{item.seatNo}</h6>
                            </td>
                        </tr>
                        <tr>
                            <td>NAME</td>
                            <td>
                                <h6>{item.name}</h6>
                            </td>
                        </tr>
                        <tr>
                            <td>Age</td>
                            <td>
                                <h6>{item.age}</h6>
                            </td>
                        </tr>
                    </table>
                </div>
            )
        })
    }


    render() {
        return (
            <div className="container">
                <h4 id={styles.head}>YOUR TICKET IS BOOKED!!
                <button id={styles.button} className="btn btn-primary" onClick={e => { e.preventDefault(); this.handleSubmit(e); }}>Logout</button>
                </h4>
                <div id={styles.bg} className="card card-body">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

export default Confirm;