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

Tracker.autorun(() => {
  document.body.classList.toggle('is-nav-open', Session.get('isNavOpen'));
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  Session.set('isNavOpen', false);
  render(<AppRouter />, window.document.getElementById('root'));
});
