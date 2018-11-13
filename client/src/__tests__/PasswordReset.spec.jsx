import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mountWrap } from '../../__mocks__/routerContext';
import {
  LENGTH_REQUIRED,
  REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_NO_NUMBER,
  INVALID_EMAIL_MSG,
} from '../configs/constants';
import * as Actions from '../app/modules/authorisation/AuthActions';
import { ResetPasswordForm } from '../components/core';

configure({ adapter: new Adapter() });

describe('Reset Password Email Form', () => {
  const props = {
    isResetPasswordVerificationCodeSent: false,
    onRequestPasswordReset: () => {},
    onSetNewPassword: () => {},
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mountWrap(<ResetPasswordForm {...props} />);
  });

  test('Should render the forgot password component', () => {
    expect(wrapper.find(ResetPasswordForm).length).toBe(1);
  });

  test('Password Reset component should have email input', () => {
    expect(wrapper.find(ResetPasswordForm).find('input[name="email"]').length).toBe(1);
  });

  test('Email is required', () => {
    const input = wrapper.find(ResetPasswordForm).find('input[name="email"]');
    input.simulate('change', { target: { name: 'email', value: '' } });
    expect(wrapper.state().errors.email).toBe(REQUIRED('Email'));
  });

  test('Email needs correct format', () => {
    const input = wrapper.find(ResetPasswordForm).find('input[name="email"]');
    input.simulate('change', { target: { name: 'email', value: 'incorrect@email' } });
    expect(wrapper.state().errors.email).toBe(INVALID_EMAIL_MSG);
  });
});

describe('Reset Password Details Form', () => {
  const props = {
    isResetPasswordVerificationCodeSent: true,
    onRequestPasswordReset: () => {},
    onSetNewPassword: () => {},
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mountWrap(<ResetPasswordForm {...props} />);
  });

  test('Should render the verification component', () => {
    expect(wrapper.find(ResetPasswordForm).length).toBe(1);
  });

  test('Password Reset component should have newpassword input', () => {
    expect(wrapper.find(ResetPasswordForm).find('input[name="newpassword"]').length).toBe(1);
  });

  test('Password Reset component should have verificationcode input', () => {
    expect(wrapper.find(ResetPasswordForm).find('input[name="verificationcode"]').length).toBe(1);
  });

  test('Password Reset component should have a button', () => {
    expect(wrapper.find(ResetPasswordForm).find('button').length).toBe(1);
  });

  test('New Password is required', () => {
    const input = wrapper.find(ResetPasswordForm).find('input[name="newpassword"]');
    input.simulate('change', { target: { name: 'newpassword', value: '' } });
    expect(wrapper.state().errors.newpassword).toBe(REQUIRED('Password'));
  });

  test('New Pasword has min length', () => {
    const input = wrapper.find(ResetPasswordForm).find('input[name="newpassword"]');
    input.simulate('change', { target: { name: 'newpassword', value: 'abc' } });
    expect(wrapper.state().errors.newpassword).toBe(LENGTH_REQUIRED('Password', { min: PASSWORD_MIN_LENGTH }));
  });

  test('Password is has no number', () => {
    const input = wrapper.find(ResetPasswordForm).find('input[name="newpassword"]');
    input.simulate('change', { target: { name: 'newpassword', value: 'abcdefghijklmno' } });
    expect(wrapper.state().errors.newpassword).toBe(PASSWORD_NO_NUMBER);
  });

  test('Verification Code is required', () => {
    const input = wrapper.find(ResetPasswordForm).find('input[name="verificationcode"]');
    input.simulate('change', { target: { name: 'verificationcode', value: '' } });
    expect(wrapper.state().errors.verificationcode).toBe(REQUIRED('Verification Code'));
  });
});

describe('Test sign up actions', () => {
  it('should create an action for password reset', () => {
    const data = {
      email: 'user@email.com',
    };
    const expectedAction = {
      type: 'ATTEMPT_REQUEST_RESET_PASSWORD',
      payload: { data },
    };
    expect(Actions.attemptRequestPasswordReset(data)).toEqual(expectedAction);
  });

  it('should create an action for password reset succeess', () => {
    const expectedAction = {
      type: 'ATTEMPT_REQUEST_RESET_PASSWORD_SUCCEED',
    };
    expect(Actions.attemptRequestPasswordResetSucceed()).toEqual(expectedAction);
  });

  it('should create an action for password reset failure', () => {
    const data = {
      code: 1,
      error: 'REQUEST_FAIL',
      message: 'The change password request failed',
    };
    const expectedAction = {
      type: 'ATTEMPT_REQUEST_RESET_PASSWORD_FAILED',
      payload: { data },
    };
    expect(Actions.attemptRequestPasswordResetFailed(data)).toEqual(expectedAction);
  });

  it('should create an action to set new password', () => {
    const data = {
      code: 123456,
    };
    const expectedAction = {
      type: 'ATTEMPT_SET_NEW_PASSWORD',
      payload: { data },
    };
    expect(Actions.attemptSetNewPassword(data)).toEqual(expectedAction);
  });

  it('should create an action for set new password success', () => {
    const expectedAction = {
      type: 'ATTEMPT_SET_NEW_PASSWORD_SUCCEED',
    };
    expect(Actions.attemptSetNewPasswordSucceed()).toEqual(expectedAction);
  });

  it('should create an action for set new password failure', () => {
    const data = {
      code: 1,
      error: 'REQUEST_FAIL',
      message: 'The sign up request failed',
    };
    const expectedAction = {
      type: 'ATTEMPT_SET_NEW_PASSWORD_FAILED',
      payload: { data },
    };
    expect(Actions.attemptSetNewPasswordFailed(data)).toEqual(expectedAction);
  });
});
