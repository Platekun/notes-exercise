import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const OnlyUnauthRoute = ({ component: Component, ...rest }) =>
  <Route {...rest} render={props =>
    Meteor.userId() ? <Redirect to="/dashboard" /> : <Component {...props} />
  } />;

export default OnlyUnauthRoute;
