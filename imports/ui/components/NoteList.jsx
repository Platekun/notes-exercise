import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import PropTypes from 'prop-types';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
import { createContainer } from 'meteor/react-meteor-data';
import Notes from '../../api/notes.js';

const renderNotes = ({ notes }) =>
  notes.length ?
    notes.map(item => <NoteListItem key={item._id} note={item} />) :
    <NoteListEmptyItem />;

export const NoteList = props =>
  <ul>
    <NoteListHeader />
    {renderNotes(props)}
    NoteList {props.notes.length}
  </ul>;

Notes.propTypes = {
  notes: PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');

  return {
    notes: Notes.find({}, { sort: { updatedAt: -1 } }).fetch().map(note => ({ ...note, selected: note._id === selectedNoteId })),
  };
}, NoteList);
