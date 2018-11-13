import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { fromJS } from 'immutable';
import reducer from 'apps/modules/authorisation/AuthReducer';
import { mountWrap } from '../../__mocks__/routerContext';
import {
  LENGTH_REQUIRED,
  REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_NO_NUMBER,
  INVALID_EMAIL_MSG,
} from '../configs/constants';
import { LoginForm } from '../components/core';
import * as Actions from '../app/modules/authorisation/AuthActions';

configure({ adapter: new Adapter() });

const props = {
  signIn: () => {},
};

describe('Login Form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountWrap(<LoginForm {...props} />);
  });

  test('Should render the login component', () => {
    expect(wrapper.find(LoginForm).length).toBe(1);
  });

  test('Login Form component should have email input', () => {
    expect(wrapper.find(LoginForm).find('input[name="email"]').length).toBe(1);
  });

  test('Login Form component should have a button', () => {
    expect(wrapper.find(LoginForm).find('button').length).toBe(1);
  });

  test('Email is required', () => {
    const input = wrapper.find(LoginForm).find('input[name="email"]');
    input.simulate('change', { target: { name: 'email', value: '' } });
    expect(wrapper.state().errors.email).toBe(REQUIRED('Email'));
  });

  test('Email is invalid', () => {
    const input = wrapper.find(LoginForm).find('input[name="email"]');
    input.simulate('change', { target: { name: 'email', value: 'ex' } });
    expect(wrapper.state().errors.email).toBe(INVALID_EMAIL_MSG);
  });

  test('Password is required', () => {
    const input = wrapper.find(LoginForm).find('input[name="password"]');
    input.simulate('change', { target: { name: 'password', value: '' } });
    expect(wrapper.state().errors.password).toBe(REQUIRED('Password'));
  });

  test('Pasword has min length', () => {
    const input = wrapper.find(LoginForm).find('input[name="password"]');
    input.simulate('change', { target: { name: 'password', value: 'abc' } });
    expect(wrapper.state().errors.password).toBe(LENGTH_REQUIRED('Password', { min: PASSWORD_MIN_LENGTH }));
  });

  test('Password is has no number', () => {
    const input = wrapper.find(LoginForm).find('input[name="password"]');
    input.simulate('change', { target: { name: 'password', value: 'abcdefghijklmno' } });
    expect(wrapper.state().errors.password).toBe(PASSWORD_NO_NUMBER);
  });
});

describe('Test login actions', () => {
  it('should create an action for login', () => {
    const data = {
      email: 'user@email.com',
      password: 'secretPassword',
    };
    const expectedAction = {
      type: 'ATTEMPT_SIGN_IN',
      payload: { data },
    };
    expect(Actions.attemptSignIn(data)).toEqual(expectedAction);
  });

  it('should create an action for login succeess', () => {
    const data = {
      user_id: 1,
      idToken: 'randomString',
      accessToken: 'randomString',
    };
    const expectedAction = {
      type: 'ATTEMPT_SIGN_IN_SUCCEED',
      payload: { data },
    };
    expect(Actions.attemptSignInSucceed(data)).toEqual(expectedAction);
  });

  it('should create an action for login failure', () => {
    const data = {
      code: 1,
      error: 'REQUEST_FAIL',
      message: 'The signin request failed',
    };
    const expectedAction = {
      type: 'ATTEMPT_SIGN_IN_FAILED',
      payload: { data },
    };
    expect(Actions.attemptSignInFailed(data)).toEqual(expectedAction);
  });

  it('should create an action to sign out user', () => {
    const data = {
      user_id: 1,
    };
    const expectedAction = {
      type: 'ATTEMPT_SIGN_OUT',
      payload: { data },
    };
    expect(Actions.attemptSignOut(data)).toEqual(expectedAction);
  });

  it('should create an action to sign out user success', () => {
    const expectedAction = {
      type: 'ATTEMPT_SIGN_OUT_SUCCEED',
    };
    expect(Actions.attemptSignOutSucceed()).toEqual(expectedAction);
  });

  it('should create an action for sign out failure', () => {
    const data = {
      code: 1,
      error: 'REQUEST_FAIL',
      message: 'The signin request failed',
    };
    const expectedAction = {
      type: 'ATTEMPT_SIGN_OUT_FAILED',
      payload: { data },
    };
    expect(Actions.attemptSignOutFailed(data)).toEqual(expectedAction);
  });
});

describe('Test login reducer', () => {
  it('should return the initial reducer state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({
      message: {},
      fields: {
        isResetPasswordFinished: false,
        isResetPasswordVerificationCodeSent: false,
        isSignUpVerificationCodeSent: false,
        isSignUpFinished: false,
      },
      error: {},
    }));
  });
});
