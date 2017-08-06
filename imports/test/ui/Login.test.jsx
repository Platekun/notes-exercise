import { Meteor } from 'meteor/meteor';
import React from 'react';
import { mount } from 'enzyme';
import { Login } from '../../ui/components/Login';
import expect from 'expect';

if (Meteor.isClient) {
  let history;

  beforeEach(function () {
    history = { replace: expect.createSpy() };
  });

  describe('Login', function () {
    it('should show error messages.', function () {
      const error = 'Dummy error.';
      const wrapper = mount(<Login loginWithPassword={() => { }} history={history} test />);

      wrapper.setState((prevState, props) => ({ error }));
      expect(wrapper.find('p').text()).toEqual(error);

      wrapper.setState((prevState, props) => ({ error: '' }));
      expect(wrapper.find('p').length).toEqual(0);
    });

    it('should call loginWithPassword with the form data.', function () {
      const email = 'some@email.com';
      const password = 'Whatever';
      const loginWithPassword = expect.createSpy();

      const wrapper = mount(<Login loginWithPassword={loginWithPassword} history={history} test />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');
      expect(loginWithPassword.calls[0].arguments[0]).toEqual({ email });
      expect(loginWithPassword.calls[0].arguments[1]).toBe(password);
    });

    it('should set loginWithPassword callback errors.', function () {
      const loginWithPassword = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={loginWithPassword} history={history} test />);
      wrapper.find('form').simulate('submit');

      loginWithPassword.calls[0].arguments[2]({});
      expect(wrapper.state('error')).toNotBe('');

      loginWithPassword.calls[0].arguments[2]();
      expect(wrapper.state('error')).toBe('');
    });
  });
}
