import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import moment from 'moment';
import { NoteListItem } from '../../ui/components/NoteListItem';
import { notes } from '../../fixtures/fixtures.js';

if (Meteor.isClient) {
  let Session;

  beforeEach(function () {
    Session = { set: expect.createSpy() };
  });

  describe('Note List Item', function () {
    it('should render title.', function () {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />);
      expect(wrapper.find('h5').text()).toBe(notes[0].title);
      expect(wrapper.find('p').text()).toBe(moment(notes[0].updatedAt).format('DD/MM/YYYY'));
    });

    it('should render untitled title if not set.', function () {
      const wrapper = mount(<NoteListItem note={notes[1]} Session={Session} />);
      expect(wrapper.find('h5').text()).toBe('Untitled');
    });

    it('should call set onClick.', function () {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />);
      wrapper.find('div').simulate('click');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });
  });
}
