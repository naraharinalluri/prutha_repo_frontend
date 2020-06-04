import React, { Component } from 'react';
import styles from './login.module.css';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    submitButton = React.createRef()
    email = React.createRef()
    emailFeedback = React.createRef()
    password = React.createRef()
    passwordFeedback = React.createRef()
    emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    onEmailChange = event => {
        this.setState({
            email: event.target.value
        })
    }
    onPasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    }

    handleSubmit = e => {

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

        if (!this.password.current.value) {
            this.passwordFeedback.current.innerText = "Password is required"
            return
        }
        this.passwordFeedback.current.innerText = ""

        if (this.emailPattern.test(this.email.current.value) && this.password.current.value) {

            this.doLogin();


        }

    }

    doLogin = () => {
        const data = this.state
        axios.post('/login', data)
            .then(res => res.data)
            .then(data => {
                let { token } = data
                sessionStorage.setItem('authToken', token)
                window.location.href = "/Home";
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (

            <div id={styles.color}>
                <form action="/action_page.php" className={styles.formContainer}>
                    <div>
                        <span id={styles.loginHead}>LOGIN</span>
                        <hr className={styles.hrRule} />
                        <input ref={this.email} type="email" className="form-control" id={styles.inputField} placeholder="Enter your Email-Id" name="yourName" value={this.state.email} onChange={this.onEmailChange} />
                        <div ref={this.emailFeedback} className="text-danger"></div>

                        <input ref={this.password} type="password" className="form-control" id={styles.inputField} name="password" placeholder="Enter your Password" value={this.state.password} onChange={this.onPasswordChange} />
                        <div ref={this.passwordFeedback} className="text-danger"></div>

                        <button ref={this.submitButton} onClick={e => { e.preventDefault(); this.handleSubmit(e) }} className={styles.loginbtn}>Login :)</button>

                        <span id={styles.newUser}> New User? <a href="/">Click Here</a></span>
                    </div>
                </form>
            </div>


        );
    }
}

export default Login;