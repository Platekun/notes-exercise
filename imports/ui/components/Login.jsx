import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

class Login extends Component {
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

        Meteor.loginWithPassword({ email }, password, err => {
            if (err) {
                this.setState((prevState, props) => ({ ...prevState, error: err.reason }));
            } else {
                this.setState(
                    (prevState, props) => ({ ...prevState, error: '' }),
                    () => this.props.history.replace('/dashboard')
                );
            }
        })
    }

    renderError() {
        return this.state.error ? <p>{this.state.error}</p> : '';
    }

    render() {
        const { renderError } = this;

        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Log In</h1>
                    {renderError()}
                    <form onSubmit={this.handleSubmit} className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email" />
                        <input type="password" ref="password" name="password" placeholder="Password" />
                        <button className="button">Log In</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
