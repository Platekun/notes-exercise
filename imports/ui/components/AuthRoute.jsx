import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (rest.path === '/dashboard/:id') {
    Session.set('selectedNoteId', rest.computedMatch.params.id);
  }
  return (<Route {...rest} render={props =>
    !!Meteor.userId() ? <Component {...props} /> : <Redirect to="/" />
  } />);
}

export default PrivateRoute;
