import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Signup } from '../../ui/components/Signup';
import expect from 'expect';

if (Meteor.isClient) {
  describe('Sign Up', function () {
    let call;
    let history;

    beforeEach(function () {
      call = expect.createSpy();
      history = { push: expect.createSpy() };
    });

    it('should show error messages.', function () {
      const error = 'Dummy error.';
      const wrapper = mount(<Signup test createUser={() => { }} test />);

      wrapper.setState((prevState, props) => ({ ...prevState, error }));
      expect(wrapper.find('p').text()).toEqual(error);

      wrapper.setState((prevState, props) => ({ error: '' }));
      expect(wrapper.find('p').length).toEqual(0);
    });

    it('should call createUser with the form data.', function () {
      const email = 'some@email.com';
      const password = '1234567890';
      const createUser = expect.createSpy();

      const wrapper = mount(<Signup test createUser={createUser} test />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;

      wrapper.find('form').simulate('submit');
      expect(createUser.calls[0].arguments[0]).toEqual({ email, password });
    });

    it('should set createUser callback errors.', function () {
      const password = 'Some long password 123456';
      const reason = 'This is why it failed.';
      const createUser = expect.createSpy();
      const history = { replace: expect.createSpy() };
      const wrapper = mount(<Signup test createUser={createUser} history={history} test />);

      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      createUser.calls[0].arguments[1]({ reason });
      expect(wrapper.state('error')).toBe(reason);

      createUser.calls[0].arguments[1]();
      expect(wrapper.state('error')).toBe('');
    });
  });
}
