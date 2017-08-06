import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

export const PrivateHeader = props =>
  <header className="header">
    <div className="header__content">
      <h1 className="header__title">{props.title}</h1>
      <button onClick={() => props.onLogout(props)} className="header__logout">Logout</button>
    </div>
  </header>;

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default createContainer(() => ({
  onLogout: ({ history }) => Accounts.logout(
    () => history.replace('/')
  )
}), PrivateHeader);
