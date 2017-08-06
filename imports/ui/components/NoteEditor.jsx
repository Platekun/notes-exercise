import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import Notes from '../../api/notes.js';

export class NoteEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: ''
    };

    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  handleBodyChange(evt) {
    evt.preventDefault();
    const body = evt.target.value;
    this.setState((prevState, props) => ({ ...prevState, body }));
    this.props.call('notes.update', this.props.note._id, { body });
  }

  handleTitleChange(evt) {
    evt.preventDefault();
    const title = evt.target.value;
    this.setState((prevState, props) => ({ ...prevState, title }));
    this.props.call('notes.update', this.props.note._id, { title });
  }

  componentDidUpdate(prevProps, prevState) {
    const previousNoteId = prevProps.note ? prevProps.note._id : undefined;
    const currentNoteId = this.props.note ? this.props.note._id : undefined;

    if (previousNoteId !== currentNoteId) {
      this.setState((prevState, props) => ({
        ...prevState,
        title: this.props.note.title,
        body: this.props.note.body
      }));
    }
  }

  deleteNote(evt) {
    evt.preventDefault();
    this.props.call('notes.remove', this.props.note._id);
    this.props.history.push('/');
  }

  render() {
    const { props, state, handleBodyChange, handleTitleChange, deleteNote } = this;
    const { selectedNoteId, note } = props;
    const { title, body } = state;
    let content;

    if (note) {
      content = (
        <div>
          <input value={title} placeholder="Your title here." onChange={handleTitleChange} />
          <textarea value={body} placeholder="Your note here." onChange={handleBodyChange}></textarea>
          <button onClick={deleteNote}>Delete note</button>
        </div>
      );
    } else {
      content = selectedNoteId ? <p>Note not found!</p> : <p>Pick a note to get started.</p>
    }

    return content;
  }
}

NoteEditor.propTypes = {
  selectedNoteId: PropTypes.string,
  note: PropTypes.object,
  call: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
}, NoteEditor);
