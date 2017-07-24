import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PrivateHeader = props =>
    <header className="header">
        <div className="header__content">
            <h1 className="header__title">{props.title}</h1>
            <button onClick={props.onLogout} className="header__logout">Logout</button>
        </div>
    </header>;

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}

export default PrivateHeader;
