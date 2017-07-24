import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { render } from 'react-dom';
import AppRouter from '../imports/ui/components/AppRouter';
import '../imports/startup/simple-schema-config';

Meteor.startup(() => {
    render(<AppRouter />, window.document.getElementById('root'));
});