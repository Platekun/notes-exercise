import { Meteor } from 'meteor/meteor';
import React from 'react';
import { mount } from 'enzyme';
import { NoteEditor } from '../../ui/components/NoteEditor';
import expect from 'expect';
import { notes } from '../../fixtures/fixtures';

if (Meteor.isClient) {
  describe('Note Editor', function () {
    let history;
    let call;

    beforeEach(function () {
      call = expect.createSpy();
      history = { push: expect.createSpy() };
    });

    it('should display an input and textarea if note exists', function () {
      const wrapper = mount(<NoteEditor history={history} call={call} note={notes[0]} />);
      expect(wrapper.find('input').length).toBe(1);
      expect(wrapper.find('textarea').length).toBe(1);
    });

    it('should notify if note was not found.', function () {
      const wrapper = mount(<NoteEditor history={history} call={call} selectedNoteId="1" />);
      expect(wrapper.find('p').text()).toBe('Note not found!');
    });

    it('should ask to pick a not if no note is selected.', function () {
      const wrapper = mount(<NoteEditor history={history} call={call} />);
      expect(wrapper.find('p').text()).toBe('Pick a note to get started.');
    });

    it('should remove note.', function () {
      const wrapper = mount(<NoteEditor history={history} call={call} note={notes[0]} />);
      wrapper.find('button').simulate('click');
      expect(history.push).toHaveBeenCalledWith('/');
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
    });

    it('should update the note body on textarea change.', function () {
      const newBody = 'This is my new body text';
      const wrapper = mount(<NoteEditor history={history} call={call} note={notes[0]} />);
      wrapper.find('textarea').simulate('change', { target: { value: newBody } });
      expect(wrapper.state('body')).toBe(newBody);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBody });
    });

    it('should update the note body on input change.', function () {
      const newTitle = 'This is my new title text';
      const wrapper = mount(<NoteEditor history={history} call={call} note={notes[0]} />);
      wrapper.find('input').simulate('change', { target: { value: newTitle } });
      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTitle });
    });

    it('should setState for new note.', function () {
      const wrapper = mount(<NoteEditor history={history} call={call} />);
      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      });
      expect(wrapper.state('title')).toBe(notes[0].title);
      expect(wrapper.state('body')).toBe(notes[0].body);
    });

    it('should not setState if prop note not provided.', function () {
      const wrapper = mount(<NoteEditor history={history} call={call} />);
      wrapper.setProps({
        selectedNoteId: notes[0]._id,
      });
      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('body')).toBe('');
    });
  });
}
