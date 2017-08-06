import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    let { email, password } = this.refs;
    email = email.value.trim();
    password = password.value.trim();

    this.props.loginWithPassword({ email }, password, err => {
      if (err) {
        this.setState((prevState, props) => ({ ...prevState, error: err.reason }));
      } else {
        this.setState(
          (prevState, props) => ({ ...prevState, error: '' }),
          () => this.props.history.replace('/dashboard')
        );
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
          <h1>Log In</h1>
          {renderError()}
          <form onSubmit={this.handleSubmit} className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Log In</button>
          </form>
          {this.props.test ? '' : <Link to="/signup">Need an account?</Link>}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired
};

export default createContainer(() => ({
  loginWithPassword: Meteor.loginWithPassword
}), Login);
