import { Accounts } from 'meteor/accounts-base';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DashboardLink from './DashboardLink';
import { createContainer } from 'meteor/react-meteor-data';

export class Signup extends Component {
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

    if (password.length < 9) {
      return this.setState((prevState, props) => ({
        ...prevState,
        error: 'Password must be more than 8 characters.'
      }));
    }

    this.props.createUser({ email, password }, err => {
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

  renderLink() {
    const { fakeContext } = this.props;
    return fakeContext ?
      <Link context={fakeContext} to="/">Already have an account?</Link>
      :
      <Link to="/">Already have an account?</Link>;
  }

  render() {
    const { renderError, renderLink } = this;
    const link = this.props.test ? '' : <DashboardLink to="/">Already have an account?</DashboardLink>;

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
          {this.props.test ? '' : <Link to="/">Already have an account?</Link>}
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default createContainer(() => ({
  createUser: Accounts.createUser
}), Signup);
