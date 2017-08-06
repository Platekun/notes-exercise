import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React, { Component } from 'react';
import { render } from 'react-dom';
import AppRouter from '../imports/ui/components/AppRouter';
import { createBrowserHistory } from 'history';
import '../imports/startup/simple-schema-config';

const history = createBrowserHistory();
Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  if(selectedNoteId) {
    history.replace(`/dashboard/${selectedNoteId}`);
  }
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  render(<AppRouter />, window.document.getElementById('root'));
});
