import { Session } from 'meteor/session';
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';

export const NoteListItem = props =>
  <div onClick={() => {
      props.Session.set('selectedNoteId', props.note._id);
      props.Session.set('isNavOpen', false);
    }}
    className={`item ${props.note.selected ? 'item--selected' : ''}`}>
      <h5 className="item__title">{props.note.title ||  'Untitled'}</h5>
      <p className="item__subtitle">{moment(props.note.updatedAt).format('DD/MM/YYYY')}</p>
  </div>;

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => ({
  Session
}), NoteListItem);
