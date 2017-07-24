import { Accounts } from 'meteor/accounts-base';
import React, { Component } from 'react';
import PrivateHeader from './PrivateHeader'

const logout = ({ history }) => Accounts.logout(() => history.replace('/'));

const LinkPage = props =>
    <div>
        <PrivateHeader title="Dashboard" onLogout={() => logout(props)} />
        <div className="wrapper">
            Dashboard
        </div>
    </div>;

export default LinkPage;
