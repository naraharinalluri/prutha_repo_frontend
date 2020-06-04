import React, { Component } from 'react';
import './seatSelection.css';
import axios from 'axios';

class SeatSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalSeats: [...new Array(20)].map((item, index) => {
                return {
                    seatNo: index + 1,
                    selected: false
                }
            }),
            busDetails: [this.props.value2],
            seatsBooked: [],
            seatsSelected: [],
            onlySeats: [],
            middleState: this.props.value[0].reservation.seats
        }
    }


    componentDidMount() {
        this.setState({
            seatsBooked: this.state.seatsBooked.concat(this.state.middleState),
        })
    }


    isBookedSeat(seatNo) {
        return this.state.seatsBooked.includes(seatNo);
    }

    selectSeatHandler(seatNo) {
        const muteState = { ...this.state };
        if (!this.isBookedSeat(seatNo)) {
            muteState.totalSeats[seatNo - 1].selected = !muteState.totalSeats[seatNo - 1].selected;
            const selectedSeats = muteState.totalSeats.filter(item => item.selected).map((item => {
                return {
                    name: '',
                    age: '',
                    seatNo: item.seatNo
                }
            }
            ));
            console.log(selectedSeats)
            this.setState({
                totalSeats: muteState.totalSeats,
                seatsSelected: selectedSeats
            })

            if (!this.state.onlySeats.includes(seatNo)) {
                this.setState({
                    onlySeats: [...this.state.onlySeats, seatNo]
                })
            }

            else {
                const result = this.state.onlySeats.filter(val => muteState.totalSeats[val - 1].selected);
                this.setState({
                    onlySeats: result
                })
            }
        }
    }

    renderList = () => {
        return this.state.seatsSelected.map((item, idx) => {
            return (
                <div className="container text-light" key={idx}>
                    <h6>Seat No : {item.seatNo}</h6>
                    <input type="text" placeholder="Name" id="inputField" name="name" onChange={(event) => this.onChangeHandler(event, item.seatNo)} /><br /><br />
                    <input type="text" placeholder="Age" id="inputField" name="age" onChange={(event) => this.onChangeHandler(event, item.seatNo)} /><br /><br />
                </div>
            )
        })
    }

    fare = () => {
        const data = this.state.busDetails[0]
        const FARE = data[0].service.fare * ((this.state.onlySeats).length)
        return FARE
    }

    tax = () => {
        const data = this.state.busDetails[0]
        const TAX = (data[0].service.fare * ((this.state.onlySeats).length)) * 0.15
        return TAX
    }

    total = () => {
        const data = this.state.busDetails[0]
        const FARE = data[0].service.fare * ((this.state.onlySeats).length)
        const TAX = (data[0].service.fare * ((this.state.onlySeats).length)) * 0.15
        const TOTAL = TAX + FARE
        return TOTAL
    }

    onChangeHandler = (event, seatNo) => {
        const muteState = [...this.state.seatsSelected];

        muteState.map((item) => {
            if (seatNo == item.seatNo) {
                item[event.target.name] = event.target.value
            }
        });
        console.log(this.state.seatsSelected)
    }

    tab = (n) => {
        this.props.changeTab(3)
    }

    dataSubmit = e => {
        // const data = this.state.busDetails[0]
        this.props.onPassengerDetails(this.state.seatsSelected)
        // console.log(data[0].service.fare)
    }

    handleSubmit = () => {
        const data = this.state.onlySeats
        axios.post(`/seatBook/updateReserved?q=${this.props.value[0].busNumber}`, data)
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div id="box2">
                <div className="container" >
                    <div id="listBox" className="box">
                        <ul className="seats">
                            {
                                this.state.totalSeats.map((item, index) => <li
                                    key={item.seatNo}
                                    onClick={() => this.selectSeatHandler(item.seatNo)}
                                    className={this.isBookedSeat(item.seatNo) ? 'bookedSeat' : item.selected ? 'selected' : ''}>
                                    {item.seatNo}
                                </li>)
                            }
                        </ul><br />
                    </div>
                </div>
                <div>
                    <br />  <h5 className="text-light">ENTER YOUR DETAILS</h5><br />
                    {this.renderList()}
                </div>
                <div className="container text-light">
                    <br /><h5>TRIP INVOICE</h5><br />
                    <h6>Seats Selected : {(this.state.onlySeats).length} </h6>
                    <h6>Price (₹): {this.fare()}</h6>
                    <h6>Service Tax (₹): {this.tax()}</h6>
                    <h6>Total Amount (₹): {this.total()}</h6><br />
                    {/* <button className="paymentbtn" onClick={e => { e.preventDefault(); { this.dataSubmit(e) } }}>Proceed to Payment</button> */}
                    <button className="paymentbtn" onClick={e => { e.preventDefault(); this.handleSubmit(); { this.tab(3) }; { this.dataSubmit(e) } }}>Proceed to Payment</button>
                    <br /><br />
                </div>
            </div >
        );
    }
}

export default SeatSelect;