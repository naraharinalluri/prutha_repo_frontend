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
            seatsBooked: [],
            seatsSelected: [],
            onlySeats: [],
            middleState: this.props.value[0].reservation.seats
        }
    }


    componentDidMount() {
        this.setState({
            seatsBooked: this.state.seatsBooked.concat(this.state.middleState)
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
                <div className="container" key={idx}>
                    <p>Seat No : {item.seatNo}</p>
                    <input type="text" placeholder="Name" name="name" onChange={(event) => this.onChangeHandler(event, item.seatNo)} /><br /><br />
                    <input type="text" placeholder="Age" name="age" onChange={(event) => this.onChangeHandler(event, item.seatNo)} /><br /><br />
                </div>
            )
        })
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
                    <br /> <h4>PASSENGER DETAILS</h4><br />
                    {this.renderList()}
                </div>
                <div className="container">
                    <br /><h4>FARE SUMMARY</h4><br />
                    <h6>TOTAL SEATS SELECTED : {(this.state.onlySeats).length} </h6>
                    <h6>FARE : </h6>
                    <h6>SERVICE TAX : </h6>
                    <h6>TOTAL CHARGES : </h6><br />
                    <button className="btn btn-lg btn-primary" onClick={e => { e.preventDefault(); this.handleSubmit(); { this.tab(3) } }}>Proceed to Payment</button>
                </div>
            </div >
        );
    }
}

export default SeatSelect;