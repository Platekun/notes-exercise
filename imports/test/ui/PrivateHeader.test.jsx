import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { PrivateHeader } from '../../ui/components/PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', function () {
    it('should set button text to logout.', function () {
      const wrapper = mount(<PrivateHeader title="Test Title" onLogout={() => { }} />);
      const buttonText = wrapper.find('button').text();
      expect(buttonText).toEqual('Logout');
    });

    it('should use title prop as h1 text.', function () {
      const title = 'Test title here';
      const wrapper = mount(<PrivateHeader title={title} onLogout={() => { }} />);
      expect(wrapper.find('h1').text()).toEqual(title);
    });

    it('should call the logout handler.', function () {
      const title = 'Test title here.';
      const onLogout = expect.createSpy();
      const wrapper = mount(<PrivateHeader title={title} onLogout={onLogout} />);
      wrapper.find('button').simulate('click');
      expect(onLogout).toHaveBeenCalled();
    });
  });
}
