import { Session } from 'meteor/session';
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';

export const NoteListItem = props =>
  <div onClick={() => props.Session.set('selectedNoteId', props.note._id)}>
    <h5>{props.note.title ||  'Untitled'}</h5>
    {props.note.selected ? 'Selected' : ''}
    <p>{moment(props.note.updatedAt).format('DD/MM/YYYY')}</p>
  </div>;

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => ({
  Session
}), NoteListItem);
