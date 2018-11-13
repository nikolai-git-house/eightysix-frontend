import { call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { push } from 'react-router-redux';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga, matchers } from 'redux-saga-test-plan';
import { attemptSignUp, attemptSignUpVerification } from '../app/modules/authorisation/AuthSaga';
import * as Api from '../api/AuthApi';
import { startLoading, stopLoading } from '../app/modules/app/AppActions';
import * as Actions from '../app/modules/authorisation/AuthActions';
import AuthReducer from '../app/modules/authorisation/AuthReducer';
import { LOGIN_ROUTE } from '../configs/constants';
import { LocalStorageMock } from '../../__mocks__/localStorageMock';

window.localStorage = new LocalStorageMock();

const signUpRequest = {
  email: 'eightysixdev@gmail.com',
  password: 'Pa$$w0rd',
  name: 'John Doe',
  phone: '+123456789',
};

const verificationRequest = {
  code: '123456',
};

const successResponse = {};

const errorResponse = {
  data: {
    code: 4000,
    error: 'BAD_REQUEST',
    message: 'Received bad request.',
  },
};

describe('attemptSignUp action sagas', () => {
  it('handles successful sign up state change', async () => {
    const result = await expectSaga(attemptSignUp, { payload: { data: signUpRequest } })
      .withReducer(AuthReducer)
      .provide([
        [matchers.call.fn(Api.attemptSignUp), successResponse],
      ])
      .put(Actions.attemptSignUpSucceed())
      .put(startLoading())
      .put(stopLoading())
      .run();

    expect(result.storeState.toJS()).toEqual({
      message: {},
      fields: {
        isResetPasswordFinished: false,
        isResetPasswordVerificationCodeSent: false,
        isSignUpVerificationCodeSent: true,
        isSignUpFinished: false,
      },
      error: {},
    });

    expect(localStorage.store).toEqual({});
  });

  it('handles failed sign up state change', async () => {
    const result = await expectSaga(attemptSignUp, { payload: { data: signUpRequest } })
      .withReducer(AuthReducer)
      .provide([
        [matchers.call.fn(Api.attemptSignUp), throwError({ response: errorResponse })],
      ])
      .put(startLoading())
      .put(stopLoading())
      .put(Actions.attemptSignUpFailed(errorResponse.data))
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
      isResetPasswordVerificationCodeSent: false,
      isSignUpVerificationCodeSent: true,
      isSignUpFinished: false,
    },
    error: {},
  });

  it('handles successful email verification state change', async () => {
    const result = await expectSaga(
      attemptSignUpVerification,
      {
        payload: { data: verificationRequest },
      },
    )
      .withReducer(AuthReducer)
      .withState(codeSentState)
      .provide([
        [matchers.call.fn(Api.attemptSignUpVerification), successResponse],
      ])
      .put(Actions.attemptSignUpVerificationSucceed())
      .put(startLoading())
      .put(stopLoading())
      .put(push(LOGIN_ROUTE))
      .run();

    expect(result.storeState.toJS()).toEqual({
      message: {},
      fields: {
        isResetPasswordFinished: false,
        isResetPasswordVerificationCodeSent: false,
        isSignUpVerificationCodeSent: false,
        isSignUpFinished: true,
      },
      error: {},
    });

    expect(localStorage.store).toEqual({});
  });

  it('handles failed email verification state change', async () => {
    const result = await expectSaga(
      attemptSignUpVerification,
      {
        payload: { data: verificationRequest },
      },
    )
      .withReducer(AuthReducer)
      .withState(codeSentState)
      .provide([
        [matchers.call.fn(Api.attemptSignUpVerification), throwError({ response: errorResponse })],
      ])
      .put(Actions.attemptSignUpVerificationFailed(errorResponse.data))
      .put(startLoading())
      .put(stopLoading())
      .run();

    expect(result.storeState.toJS()).toEqual({
      message: { type: 'danger', text: 'Received bad request.' },
      fields: {
        isResetPasswordFinished: false,
        isResetPasswordVerificationCodeSent: false,
        isSignUpVerificationCodeSent: true,
        isSignUpFinished: false,
      },
      error: { status: 4000, exception: 'BAD_REQUEST' },
    });

    expect(localStorage.store).toEqual({});
  });
});

describe('Successful attemptSignUp generator function', () => {
  const generator = attemptSignUp({ payload: { data: signUpRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptSignUp function', () => {
    expect(generator.next(signUpRequest).value)
      .toEqual(call(Api.attemptSignUp, signUpRequest));
  });

  test('must dispatch attemptSignUpSucceed action', () => {
    expect(generator.next().value)
      .toEqual(put(Actions.attemptSignUpSucceed()));
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

describe('Failed attemptSignUp generator function', () => {
  const generator = attemptSignUp({ payload: { data: signUpRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptSignUp function', () => {
    expect(generator.next(signUpRequest).value)
      .toEqual(call(Api.attemptSignUp, signUpRequest));
  });

  test('dispatch attemptSignUpFailed action', () => {
    expect(generator.throw({ response: errorResponse }).value)
      .toEqual(put(Actions.attemptSignUpFailed(errorResponse.data)));
  });

  test('dispatch stop Loading action', () => {
    expect(generator.next().value)
      .toEqual(put(stopLoading()));
  });

  test('generator has yielded all values', () => {
    expect(generator.next().done).toBe(true);
  });
});

describe('Successful attemptSignUpVerification generator function', () => {
  const generator = attemptSignUpVerification({ payload: { data: verificationRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptSignUpVerification function', () => {
    expect(generator.next(verificationRequest).value)
      .toEqual(call(Api.attemptSignUpVerification, verificationRequest));
  });

  test('must dispatch attemptSignUpVerificationSucceed action', () => {
    expect(generator.next(successResponse).value)
      .toEqual(put(Actions.attemptSignUpVerificationSucceed(successResponse.data)));
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

describe('Failed attemptSignUpVerification generator function', () => {
  const generator = attemptSignUpVerification({ payload: { data: verificationRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptSignUpVerification function', () => {
    expect(generator.next(verificationRequest).value)
      .toEqual(call(Api.attemptSignUpVerification, verificationRequest));
  });

  test('must dispatch attemptSignUpVerificationFailed action', () => {
    expect(generator.throw({ response: errorResponse }).value)
      .toEqual(put(Actions.attemptSignUpVerificationFailed(errorResponse.data)));
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
