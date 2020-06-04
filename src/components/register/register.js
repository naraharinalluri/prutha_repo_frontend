import React, { Component } from 'react';
import styles from './register.module.css';
import axios from 'axios';

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      mobile: '',
      disabled: true
    }
  }


  submitButton = React.createRef()
  name = React.createRef()
  nameFeedback = React.createRef()
  email = React.createRef()
  emailFeedback = React.createRef()
  mobile = React.createRef()
  mobileFeedback = React.createRef()
  dob = React.createRef()
  dobFeedback = React.createRef()
  password = React.createRef()
  passwordFeedback = React.createRef()
  emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  mobilePattern = /^\d{10}$/


  handleSubmit = e => {

    if (!this.name.current.value) {
      this.nameFeedback.current.innerText = "Name is required"
      return
    }
    this.nameFeedback.current.innerText = ""

    if (!this.dob.current.value) {
      this.dobFeedback.current.innerText = "Date of Birth is required"
      return
    }
    this.dobFeedback.current.innerText = ""


    if (!this.email.current.value) {
      this.emailFeedback.current.innerText = "Email is required"
      return
    }
    this.emailFeedback.current.innerText = ""

    if (!this.emailPattern.test(this.email.current.value)) {
      this.emailFeedback.current.innerText = "Email is invalid"
      return
    }
    this.emailFeedback.current.innerText = ""

    if (!this.mobile.current.value) {
      this.mobileFeedback.current.innerText = "Mobile Number is required"
      return
    }
    this.mobileFeedback.current.innerText = ""

    if (!this.mobilePattern.test(this.mobile.current.value)) {
      this.mobileFeedback.current.innerText = "Please enter a valid Mobile Number"
      return
    }
    this.emailFeedback.current.innerText = ""

    if (!this.password.current.value) {
      this.passwordFeedback.current.innerText = "Password is required"
      return
    }
    this.passwordFeedback.current.innerText = ""

    if (this.emailPattern.test(this.email.current.value) && this.password.current.value) {

      this.detailsState()
      this.enable()


    }
    // console.log(this.state)
  }

  enable = () => {
    this.setState({
      disabled: false
    })
  }

  submitDetails = () => {
    const data = this.state
    axios.post('/register', data)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    window.location = '/login'
  }

  detailsState = () => {
    this.setState({
      name: this.name.current.value,
      email: this.email.current.value,
      password: this.password.current.value,
      mobile: this.mobile.current.value,
    })
  }


  render() {
    return (
      <div id={styles.color}>
        <form action="/action_page.php" id={styles.formContainer}  >
          <div>
            <span id={styles.signupHead}>SIGN UP</span>
            <hr id={styles.hrRule} />

            <div className="form-group row">
              <label for="name" className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input ref={this.name} type="text" className="form-control" id={styles.inputField} placeholder="Enter your Name" name="yourName" />
                <div ref={this.nameFeedback} className="text-danger"></div>
              </div>
            </div>

            <div className="form-group row">
              <label for="email" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input ref={this.email} type="email" className="form-control" id={styles.inputField} placeholder="Enter Email" name="yourName" />
                <div ref={this.emailFeedback} className="text-danger"></div>
              </div>
            </div>

            <div className="form-group row">
              <label for="mobile" className="col-sm-2 col-form-label">Mobile</label>
              <div className="col-sm-10">
                <input ref={this.mobile} type="number" className="form-control" id={styles.inputField} placeholder="Enter your Mobile number" name="mobile" />
                <div ref={this.mobileFeedback} className="text-danger"></div>
              </div>
            </div>

            <div className="form-group row">
              <label for="password" className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input ref={this.password} type="password" className="form-control" id={styles.inputField} name="password" placeholder="Enter Password" />
                <div ref={this.passwordFeedback} className="text-danger"></div>
              </div>
            </div>

            <div className="form-group row">
              <label for="dob" className="col-sm-2 col-form-label">Date of Birth</label>
              <div className="col-sm-10">
                <input ref={this.dob} type="date" className="form-control" id={styles.inputField} name="dob" />
                <div ref={this.dobFeedback} className="text-danger"></div>
              </div>
            </div>

            <div className="form-group row">
              <label for="Gender" className="col-sm-2 col-form-label">Gender</label>
              <div className="col-sm-10">
                <input type="radio" name="gender" value="male" /> Male &nbsp;
            <input type="radio" name="gender" value="female" /> Female
        </div>
            </div>

            <p>By clicking you agree to our <a href="#" className={styles.tnc}>Terms & Privacy</a>.&nbsp;&nbsp;
            <button className="btn btn-primary btn-sm rounded-0" onClick={e => { e.preventDefault(); this.handleSubmit(e); }}>Agree</button></p>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-10">

                <button disabled={this.state.disabled} ref={this.submitButton} onClick={e => { e.preventDefault(); this.submitDetails() }} className={styles.signupbtn}>SIGN UP</button>
              </div>
            </div>

          </div>
        </form>

      </div>
    );
  }
}

export default Register;