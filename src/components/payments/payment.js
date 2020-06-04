import React, { Component } from 'react';
import styles from './payment.module.css';

class Payment extends Component {

    cardNumber = React.createRef()
    cardName = React.createRef()
    allFeedback = React.createRef()
    cvv = React.createRef()
    date = React.createRef()


    handleSubmit = e => {

        if (!this.cardName.current.value || !this.cardNumber.current.value || !this.cvv.current.value || !this.date.current.value) {
            this.allFeedback.current.innerText = "All Fields are required"
            return
        }
        else {
            this.allFeedback.current.innerText = ""
            { this.tab(4) };
        }

    }


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
                                <td id={styles.paymentHead}>PAYMENT DETAILS</td>
                                <div ref={this.allFeedback} className="text-danger"></div>
                            </tr>
                            <tr>
                                <td>Card Type</td>
                                <td> <input type="radio" name="cardType" value="visa" /> Visa &nbsp;
                                <input type="radio" name="cardType" value="master" /> Master Card
                            </td>
                            </tr>
                            <tr>
                                <td>Card Number</td>
                                <td><input type="text" ref={this.cardNumber} className="form-control" id={styles.inputField} placeholder="Enter Card Number" name="yourName" /></td>
                            </tr>
                            <tr>
                                <td>Name on Card</td>
                                <td><input type="text" ref={this.cardName} class="form-control" id={styles.inputField} placeholder="Enter your Name" name="yourName" /></td>
                            </tr>
                            <tr>
                                <td>CVV</td>
                                <td><input type="password" ref={this.cvv} className="form-control" id={styles.cvvField} placeholder="cvv" maxLength={3} name="yourName" /></td>
                            </tr>
                            <tr>
                                <td>Expiry Date</td>
                                <td><input type="date" ref={this.date} className="form-control" id={styles.inputField} name="dob" /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><button className={styles.signupbtn} onClick={e => { e.preventDefault(); this.handleSubmit(e) }}>Pay</button><button className={styles.cancelbtn}>Cancel</button></td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>
        );
    }
}

export default Payment;