import React, { Component } from 'react';
import styles from './payment.module.css';

class Payment extends Component {

    tab = (n) => {
        this.props.changeTab(4)
    }

    render() {
        return (
            <div>

                <div className="container">

                    <table className="table table-dark" id={styles.formContainer}>
                        <tbody>
                            <tr>
                                <td>Card Type</td>
                                <td> <input type="radio" name="cardType" value="visa" /> Visa &nbsp;
            <input type="radio" name="cardType" value="master" /> Master Card
        </td>
                            </tr>
                            <tr>
                                <td>Card Number</td>
                                <td><input type="text" className="form-control" id={styles.inputField} placeholder="Enter Card Number" name="yourName" /></td>
                            </tr>
                            <tr>
                                <td>Name on Card</td>
                                <td><input type="text" class="form-control" id={styles.inputField} placeholder="Enter your Name" name="yourName" /></td>
                            </tr>
                            <tr>
                                <td>CVV</td>
                                <td><input type="text" className="form-control" id={styles.cvvField} placeholder="cvv" name="yourName" /></td>
                            </tr>
                            <tr>
                                <td>Expiry Date</td>
                                <td><input type="date" className="form-control" id={styles.inputField} name="dob" /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><button className={styles.signupbtn} onClick={e => { e.preventDefault(); { this.tab(4) } }}>Pay</button><button className={styles.cancelbtn}>Cancel</button></td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>
        );
    }
}

export default Payment;