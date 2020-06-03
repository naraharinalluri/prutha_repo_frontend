import React, { Component } from 'react';
import styles from './search.module.css';
import axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            from: [],
            to: [],
            busData: []
        }
    }

    tab = (n) => {
        this.props.changeTab(2)
    }

    handleBusNumber = e => {
        this.props.onBusDetails(e)
    }

    handleChangeEventFrom = (e, field) => {
        const fieldValue = e.target.value
        this.setState({
            from: [...this.state.from, fieldValue]
        })
    }

    handleChangeEventTo = (e, field) => {
        const fieldValue = e.target.value
        this.setState({
            to: [...this.state.to, fieldValue]
        })
    }

    handleSearch = e => {
        const data = this.state
        axios.post('/seatBook/search', data)
            .then(res => {
                this.setState({
                    busData: res.data
                });
            })
            .catch(err => {
                console.log(err)
            })
    }
    //------------------------------------------------------------------------
    renderList = () => {
        return this.state.busData.map((item, idx) => {

            return (
                <div key={idx}>
                    <table id={styles.row} className="table table-hover">
                        <thead >
                            <tr >
                                <th scope="col">Bus Type</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Departure Time</th>
                                <th scope="col">Arrival Time</th>
                                <th scope="col">Fare (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{item.busType}</td>
                                <td>{item.service.from}</td>
                                <td>{item.service.to}</td>
                                <td>{item.service.dep}</td>
                                <td>{item.service.arr}</td>
                                <td>{item.service.fare}</td>
                                <td className="text-right">
                                    <button id={styles.search} onClick={e => { e.preventDefault(); this.handleBusNumber(item); { this.tab(2) } }} className="btn btn-sm btn-primary">SELECT SEATS</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        })
    }
    //------------------------------------------------------------------------


    render() {
        return (
            <div>
                <div className="container" id={styles.bigOp}>
                    <form className="form-inline">
                        <datalist id="cities">
                            <option>Bangalore</option>
                            <option>Chennai</option>
                            <option>Kolkata</option>
                            <option>Gujarat</option>
                            <option>Mumbai</option>
                        </datalist>
                        <label className="sr-only" for="fromDest">From : </label>
                        <input type="text" list="cities" value={this.state.from} className="form-control mb-2 mr-sm-2" id={styles.inputField} placeholder="From" onChange={e => this.handleChangeEventFrom(e, 'from')} />
                        <label className="sr-only" for="toDest">To : </label>
                        <input type="text" list="cities" value={this.state.to} className="form-control mb-2 mr-sm-2" id={styles.inputField} placeholder="To" onChange={e => this.handleChangeEventTo(e, 'to')} />
                        <label className="sr-only" for="inlineFormInputName2">Date : </label>
                        <input type="date" className="form-control mb-2 mr-sm-2" id={styles.inputField} name="dob" />
                        <button type="submit" className="btn btn-primary mb-2" id={styles.signupbtn} onClick={e => { e.preventDefault(); this.handleSearch(e) }}> Search</button>
                    </form>
                </div>
                <div id={styles.box} className=" container">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

export default Search;