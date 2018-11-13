import { call, put } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';
import { fromJS } from 'immutable';
import { push } from 'react-router-redux';
import { expectSaga, matchers } from 'redux-saga-test-plan';
import { attemptRequestPasswordReset, attemptSetNewPassword } from '../app/modules/authorisation/AuthSaga';
import * as Api from '../api/AuthApi';
import { startLoading, stopLoading } from '../app/modules/app/AppActions';

import * as Actions from '../app/modules/authorisation/AuthActions';
import AuthReducer from '../app/modules/authorisation/AuthReducer';
import { LOGIN_ROUTE } from '../configs/constants';
import { LocalStorageMock } from '../../__mocks__/localStorageMock';

window.localStorage = new LocalStorageMock();

const forgotPasswordRequest = {
  email: 'eightysixdev@gmail.com',
};

const passwordSetRequest = {
  code: '123456',
  newpassword: 'newPa$$w0rd',
};

const successResponse = {};

const errorResponse = {
  data: {
    code: 4000,
    error: 'BAD_REQUEST',
    message: 'Received bad request.',
  },
};

describe('attemptRequestPasswordReset action sagas', () => {
  it('handles successful reset password state change', async () => {
    const result = await expectSaga(
      attemptRequestPasswordReset,
      {
        payload: { data: forgotPasswordRequest },
      },
    )
      .withReducer(AuthReducer)
      .provide([
        [matchers.call.fn(Api.attemptRequestPasswordReset), successResponse],
      ])
      .put(Actions.attemptRequestPasswordResetSucceed())
      .put(startLoading())
      .put(stopLoading())
      .run();

    expect(result.storeState.toJS()).toEqual({
      message: {},
      fields: {
        isResetPasswordFinished: false,
        isResetPasswordVerificationCodeSent: true,
        isSignUpVerificationCodeSent: false,
        isSignUpFinished: false,
      },
      error: {},
    });

    expect(localStorage.store).toEqual({});
  });

  it('handles failed reset password state change', async () => {
    const result = await expectSaga(
      attemptRequestPasswordReset,
      {
        payload: { data: forgotPasswordRequest },
      },
    )
      .withReducer(AuthReducer)
      .provide([
        [matchers.call.fn(Api.attemptRequestPasswordReset),
          throwError({ response: errorResponse })],
      ])
      .put(startLoading())
      .put(stopLoading())
      .put(Actions.attemptRequestPasswordResetFailed(errorResponse.data))
      .run();

    expect(result.storeState.toJS()).toEqual({
      message: { type: 'danger', text: 'Received bad request.' },
      fields: {
        isResetPasswordFinished: false,
        isResetPasswordVerificationCodeSent: false,
        isSignUpVerificationCodeSent: false,
        isSignUpFinished: false,
      },
      error: { status: 4000, exception: 'BAD_REQUEST' },
    });

    expect(localStorage.store).toEqual({});
  });

  const codeSentState = fromJS({
    message: {},
    fields: {
      isResetPasswordFinished: false,
      isResetPasswordVerificationCodeSent: true,
      isSignUpVerificationCodeSent: false,
      isSignUpFinished: false,
    },
    error: {},
  });

  it('handles successful set new password state change', async () => {
    const result = await expectSaga(
      attemptSetNewPassword,
      {
        payload: { data: passwordSetRequest },
      },
    )
      .withReducer(AuthReducer)
      .withState(codeSentState)
      .provide([
        [matchers.call.fn(Api.attemptSetNewPassword), successResponse],
      ])
      .put(Actions.attemptSetNewPasswordSucceed())
      .put(startLoading())
      .put(stopLoading())
      .put(push(LOGIN_ROUTE))
      .run();

    expect(result.storeState.toJS()).toEqual({
      message: {},
      fields: {
        isResetPasswordFinished: true,
        isResetPasswordVerificationCodeSent: false,
        isSignUpVerificationCodeSent: false,
        isSignUpFinished: false,
      },
      error: {},
    });

    expect(localStorage.store).toEqual({});
  });

  it('handles failed set new password state change', async () => {
    const result = await expectSaga(
      attemptSetNewPassword,
      {
        payload: { data: passwordSetRequest },
      },
    )
      .withReducer(AuthReducer)
      .withState(codeSentState)
      .provide([
        [matchers.call.fn(Api.attemptSetNewPassword), throwError({ response: errorResponse })],
      ])
      .put(Actions.attemptSetNewPasswordFailed(errorResponse.data))
      .put(startLoading())
      .put(stopLoading())
      .run();

    expect(result.storeState.toJS()).toEqual({
      message: { type: 'danger', text: 'Received bad request.' },
      fields: {
        isResetPasswordFinished: false,
        isResetPasswordVerificationCodeSent: true,
        isSignUpVerificationCodeSent: false,
        isSignUpFinished: false,
      },
      error: { status: 4000, exception: 'BAD_REQUEST' },
    });

    expect(localStorage.store).toEqual({});
  });
});

describe('Successful resetPasswordRequest generator', () => {
  const generator = attemptRequestPasswordReset({ payload: { data: forgotPasswordRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptRequestPasswordReset function', () => {
    expect(generator.next(forgotPasswordRequest).value)
      .toEqual(call(Api.attemptRequestPasswordReset, forgotPasswordRequest));
  });

  test('must dispatch attemptRequestPasswordResetSucceed action', () => {
    expect(generator.next().value)
      .toEqual(put(Actions.attemptRequestPasswordResetSucceed()));
  });

  test('must dispatch stopLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(stopLoading()));
  });

  test('generator has yielded all values', () => {
    expect(generator.next().done)
      .toBe(true);
  });
});

describe('Failed attemptRequestPasswordReset generator', () => {
  const generator = attemptRequestPasswordReset({ payload: { data: forgotPasswordRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptRequestPasswordReset function', () => {
    expect(generator.next(forgotPasswordRequest).value)
      .toEqual(call(Api.attemptRequestPasswordReset, forgotPasswordRequest));
  });

  test('dispatch attemptSignUpFailed action', () => {
    expect(generator.throw({ response: errorResponse }).value)
      .toEqual(put(Actions.attemptRequestPasswordResetFailed(errorResponse.data)));
  });

  test('dispatch stop Loading action', () => {
    expect(generator.next().value)
      .toEqual(put(stopLoading()));
  });

  test('generator has yielded all values', () => {
    expect(generator.next().done).toBe(true);
  });
});

describe('Successful attemptSetNewPassword generator function', () => {
  const generator = attemptSetNewPassword({ payload: { data: passwordSetRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptSetNewPassword function', () => {
    expect(generator.next(passwordSetRequest).value)
      .toEqual(call(Api.attemptSetNewPassword, passwordSetRequest));
  });

  test('must dispatch attemptSetNewPasswordSucceed action', () => {
    expect(generator.next().value)
      .toEqual(put(Actions.attemptSetNewPasswordSucceed()));
  });

  test('must dispatch stopLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(stopLoading()));
  });

  test('must push to Customer Index route', () => {
    expect(generator.next().value)
      .toEqual(put(push(LOGIN_ROUTE)));
  });

  test('generator has yielded all values', () => {
    expect(generator.next().done)
      .toBe(true);
  });
});

describe('Failed attemptSetNewPassword generator', () => {
  const generator = attemptSetNewPassword({ payload: { data: passwordSetRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptSetNewPassword function', () => {
    expect(generator.next(passwordSetRequest).value)
      .toEqual(call(Api.attemptSetNewPassword, passwordSetRequest));
  });

  test('must dispatch attemptSetNewPasswordFailed action', () => {
    expect(generator.throw({ response: errorResponse }).value)
      .toEqual(put(Actions.attemptSetNewPasswordFailed(errorResponse.data)));
  });

  test('must dispatch stopLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(stopLoading()));
  });

  test('generator has yielded all values', () => {
    expect(generator.next().done)
      .toBe(true);
  });
});
