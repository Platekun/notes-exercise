import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

export const NoteListHeader = props =>
  <header>
    <button onClick={() => props.meteorCall('notes.insert', (err, res) => {
      if (res) {
        props.Session.set('selectedNoteId', res);
      }
    })}>
      Create note
        </button>
  </header>;

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.func.isRequired
};

export default createContainer(() => ({
  meteorCall: Meteor.call,
  Session
}), NoteListHeader);
