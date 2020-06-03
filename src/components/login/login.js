import React, { Component } from 'react';
import styles from './login.module.css';

class Login extends Component {


    submitButton = React.createRef()
    email = React.createRef()
    emailFeedback = React.createRef()
    password = React.createRef()
    passwordFeedback = React.createRef()
    emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/


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

            window.location = '/user';


        }

    }


    render() {
        return (
            
        <div id={styles.color}>
            <form action="/action_page.php" className={styles.formContainer}>
                <div>
                    <span id={styles.loginHead}>LOGIN</span>
                    <hr className={styles.hrRule} />
                    <input ref={this.email} type="email" className="form-control" id={styles.inputField} placeholder="Enter your Email-Id" name="yourName" />
                    <div ref={this.emailFeedback} className="text-danger"></div>

                    <input ref={this.password} type="password" className="form-control" id={styles.inputField}  name="password" placeholder="Enter your Password" />
                    <div ref={this.passwordFeedback} className="text-danger"></div>

                    <button ref={this.submitButton}  onClick = {e => { e.preventDefault(); this.handleSubmit(e)}} className={styles.loginbtn}>Login :)</button>

                    <span id={styles.newUser}> New User? <a href="/signup">Click Here</a></span>
                </div>
            </form>
        </div>


        );
    }
}

export default Login;