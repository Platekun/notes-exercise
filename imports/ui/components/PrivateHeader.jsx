import { Session } from 'meteor/session';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

const renderMenu = ({isNavOpen}) => !isNavOpen ?
  '/images/bars.svg' : '/images/x.svg';

export const PrivateHeader = props =>
  <header className="header">
    <div className="header__content">
      <img src={renderMenu(props)} onClick={props.toggleNav} className="header__nav-toggle"/>
      <h1 className="header__title">{props.title}</h1>
      <button onClick={() => props.onLogout(props)} className="header__logout">Logout</button>
    </div>
  </header>;

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired
};

export default createContainer(() => ({
  onLogout: ({ history }) => Accounts.logout(
    () => history.replace('/')
  ),
  isNavOpen: Session.get('isNavOpen'),
  toggleNav: () => Session.set('isNavOpen', !Session.get('isNavOpen'))
}), PrivateHeader);
