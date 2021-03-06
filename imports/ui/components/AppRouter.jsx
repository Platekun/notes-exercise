import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import OnlyUnauthRoute from './OnlyUnauthRoute';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import NotFound from './NotFound';

const AppRouter = () =>
  <BrowserRouter>
    <Switch>
      <OnlyUnauthRoute exact path="/" component={Login} />
      <OnlyUnauthRoute path="/signup" component={Signup} />
      <AuthRoute exact path="/dashboard" component={Dashboard} />
      <AuthRoute path="/dashboard/:id" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>;

export default AppRouter;
