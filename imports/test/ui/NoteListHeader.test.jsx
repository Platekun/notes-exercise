import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { NoteListHeader } from '../../ui/components/NoteListHeader';

if (Meteor.isClient) {
  describe('Note List Item', function () {
    it('should call meteor call on click.', function () {
      const meteorCall = expect.createSpy();
      const Session = { set: expect.createSpy() };
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session} />);
      wrapper.find('button').simulate('click');
      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
    });

    it('should call Session set with the new note id.', function () {
      const meteorCall = expect.createSpy();
      const Session = { set: expect.createSpy() };
      const wrapper = mount(<NoteListHeader metoerCall={meteorCall} Session={Session} />);
      wrapper.find('button').simulate('click');
      const onNoteInserted = meteorCall.calls[0].arguments[1];

      onNoteInserted(undefined, '1');
      expect(Session.set).toHaveBeenCalled();
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', '1');
    });

    it('should not call Session set if insert failed.', function () {
      const meteorCall = expect.createSpy();
      const Session = { set: expect.createSpy() };
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session} />);
      wrapper.find('button').simulate('click');
      const onNoteInserted = meteorCall.calls[0].arguments[1];

      onNoteInserted('error');
      expect(Session.set).toNotHaveBeenCalled();
    });
  });
}
