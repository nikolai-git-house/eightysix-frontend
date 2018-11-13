import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {
  REQUIRED,
  PASSWORD_NO_NUMBER,
  LENGTH_REQUIRED,
  PASSWORD_MIN_LENGTH,
  INVALID_EMAIL_MSG,
  INVALID_PHONE_MSG,
} from 'configs/constants';
import { mountWrap } from '../../__mocks__/routerContext';
import { SignUpForm } from '../components/core';
import * as Actions from '../app/modules/authorisation/AuthActions';

configure({ adapter: new Adapter() });

describe('Sign Up Details Form', () => {
  const props = {
    isSignUpVerificationCodeSent: false,
    onSignUp: () => {},
    onSignUpVerification: () => {},
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mountWrap(<SignUpForm {...props} />);
  });

  test('Should render the sign up component', () => {
    expect(wrapper.find(SignUpForm).length).toBe(1);
  });

  test('Login Form component should have email input', () => {
    expect(wrapper.find(SignUpForm).find('input[name="email"]').length).toBe(1);
  });

  test('Login Form component should have password input', () => {
    expect(wrapper.find(SignUpForm).find('input[name="password"]').length).toBe(1);
  });

  test('Login Form component should have name input', () => {
    expect(wrapper.find(SignUpForm).find('input[name="name"]').length).toBe(1);
  });

  test('Login Form component should have phone input', () => {
    expect(wrapper.find(SignUpForm).find('input[name="phone"]').length).toBe(1);
  });

  test('Login Form component should have a button', () => {
    expect(wrapper.find(SignUpForm).find('button').length).toBe(1);
  });

  test('Email is required', () => {
    const input = wrapper.find(SignUpForm).find('input[name="email"]');
    input.simulate('change', { target: { name: 'email', value: '' } });
    expect(wrapper.state().signUpErrors.email).toBe(REQUIRED('Email'));
  });

  test('Email is invalid', () => {
    const input = wrapper.find(SignUpForm).find('input[name="email"]');
    input.simulate('change', { target: { name: 'email', value: 'ex' } });
    expect(wrapper.state().signUpErrors.email).toBe(INVALID_EMAIL_MSG);
  });

  test('Password is required', () => {
    const input = wrapper.find(SignUpForm).find('input[name="password"]');
    input.simulate('change', { target: { name: 'password', value: '' } });
    expect(wrapper.state().signUpErrors.password).toBe(REQUIRED('Password'));
  });

  test('Password is has minimum length', () => {
    const input = wrapper.find(SignUpForm).find('input[name="password"]');
    input.simulate('change', { target: { name: 'password', value: 'ab' } });
    expect(wrapper.state().signUpErrors.password).toBe(LENGTH_REQUIRED('Password', { min: PASSWORD_MIN_LENGTH }));
  });

  test('Password is has no number', () => {
    const input = wrapper.find(SignUpForm).find('input[name="password"]');
    input.simulate('change', { target: { name: 'password', value: 'abcdefghijklmno' } });
    expect(wrapper.state().signUpErrors.password).toBe(PASSWORD_NO_NUMBER);
  });

  test('Phone is required', () => {
    const input = wrapper.find(SignUpForm).find('input[name="phone"]');
    input.simulate('change', { target: { name: 'phone', value: '' } });
    expect(wrapper.state().signUpErrors.phone).toBe(REQUIRED('Phone'));
  });

  test('Phone number is invalid', () => {
    const input = wrapper.find(SignUpForm).find('input[name="phone"]');
    input.simulate('change', { target: { name: 'phone', value: '12345' } });
    expect(wrapper.state().signUpErrors.phone).toBe(INVALID_PHONE_MSG);
  });

  test('Name is required', () => {
    const input = wrapper.find(SignUpForm).find('input[name="name"]');
    input.simulate('change', { target: { name: 'name', value: '' } });
    expect(wrapper.state().signUpErrors.name).toBe(REQUIRED('Name'));
  });
});

describe('Sign Up Verification Form', () => {
  const props = {
    isSignUpVerificationCodeSent: true,
    onSignUp: () => {},
    onSignUpVerification: () => {},
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mountWrap(<SignUpForm {...props} />);
  });

  test('Should render the sign up component', () => {
    expect(wrapper.find(SignUpForm).length).toBe(1);
  });

  test('Login Form component should have code input', () => {
    expect(wrapper.find(SignUpForm).find('input[name="code"]').length).toBe(1);
  });

  test('Code is required', () => {
    const input = wrapper.find(SignUpForm).find('input[name="code"]');
    input.simulate('change', { target: { name: 'code', value: '' } });
    expect(wrapper.state().verificationErrors.code).toBe(REQUIRED('Verification Code'));
  });
});

describe('Test sign up actions', () => {
  it('should create an action for sign up', () => {
    const data = {
      email: 'user@email.com',
      password: 'secretPassword',
      name: 'User Name',
      number: '+123456789',
    };
    const expectedAction = {
      type: 'ATTEMPT_SIGN_UP',
      payload: { data },
    };
    expect(Actions.attemptSignUp(data)).toEqual(expectedAction);
  });

  it('should create an action for sign up succeess', () => {
    const expectedAction = {
      type: 'ATTEMPT_SIGN_UP_SUCCEED',
    };
    expect(Actions.attemptSignUpSucceed()).toEqual(expectedAction);
  });

  it('should create an action for sign up failure', () => {
    const data = {
      code: 1,
      error: 'REQUEST_FAIL',
      message: 'The sign up request failed',
    };
    const expectedAction = {
      type: 'ATTEMPT_SIGN_UP_FAILED',
      payload: { data },
    };
    expect(Actions.attemptSignUpFailed(data)).toEqual(expectedAction);
  });

  it('should create an action to verify user', () => {
    const data = {
      code: 123456,
    };
    const expectedAction = {
      type: 'ATTEMPT_SIGN_UP_VERIFICATION',
      payload: { data },
    };
    expect(Actions.attemptSignUpVerification(data)).toEqual(expectedAction);
  });

  it('should create an action for sign up verification success', () => {
    const expectedAction = {
      type: 'ATTEMPT_SIGN_UP_VERIFICATION_SUCCEED',
    };
    expect(Actions.attemptSignUpVerificationSucceed()).toEqual(expectedAction);
  });

  it('should create an action for sign up verification failure', () => {
    const data = {
      code: 1,
      error: 'REQUEST_FAIL',
      message: 'The sign up request failed',
    };
    const expectedAction = {
      type: 'ATTEMPT_SIGN_UP_VERIFICATION_FAILED',
      payload: { data },
    };
    expect(Actions.attemptSignUpVerificationFailed(data)).toEqual(expectedAction);
  });
});
