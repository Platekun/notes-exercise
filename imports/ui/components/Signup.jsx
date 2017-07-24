import { Accounts } from 'meteor/accounts-base';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    handleSubmit(evt) {
        evt.preventDefault();

        let { email, password } = this.refs;
        email = email.value.trim();
        password = password.value.trim();

        if (password.length < 9) {
            return this.setState((prevState, props) => ({
                ...prevState,
                error: 'Password must be more than 8 characters.'
            }));
        }

        Accounts.createUser({ email, password }, err => {
            if (err) {
                this.setState((prevState, props) => ({ ...prevState, error: err.reason }));
            } else {
                this.setState(
                    (prevState, props) => ({ ...prevState, error: '' }),
                    this.props.history.replace('/dashboard')
                )
            }
        });
    }

    renderError() {
        return this.state.error ? <p>{this.state.error}</p> : '';
    }

    render() {
        const { renderError } = this;

        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Join Dashboard</h1>
                    {renderError()}
                    <form onSubmit={this.handleSubmit} noValidate className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email" />
                        <input type="password" ref="password" name="password" placeholder="Password" />
                        <button className="button">Create Account</button>
                    </form>
                    <Link to="/">Already have an account?</Link>
                </div>
            </div>
        );
    }
}

export default Signup;
