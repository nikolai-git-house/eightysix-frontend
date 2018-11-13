import { call, put } from 'redux-saga/effects';
import { expectSaga, matchers } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { push } from 'react-router-redux';
import { attemptSignIn } from '../app/modules/authorisation/AuthSaga';
import * as Api from '../api/AuthApi';
import { startLoading, stopLoading } from '../app/modules/app/AppActions';
import * as Actions from '../app/modules/authorisation/AuthActions';
import AuthReducer from '../app/modules/authorisation/AuthReducer';
import { CUSTOMER_INDEX_ROUTE } from '../configs/constants';
import { LocalStorageMock } from '../../__mocks__/localStorageMock';

window.localStorage = new LocalStorageMock();

const apiRequest = {
  email: 'eightysixdev@gmail.com',
  password: 'Pa$$w0rd',
};

const successResponse = {
  data: {
    user_id: 1,
    idToken: 'cognitoIdToken',
    accessToken: 'cognitoAccessToken',
  },
};

const errorResponse = {
  data: {
    code: 4000,
    error: 'BAD_REQUEST',
    message: 'Received bad request.',
  },
};

describe('attemptSignIn action sagas', () => {
  it('handles successful login state change', async () => {
    const result = await expectSaga(attemptSignIn, { payload: { data: apiRequest } })
      .withReducer(AuthReducer)
      .provide([
        [matchers.call.fn(Api.attemptSignIn), successResponse],
      ])
      .put(Actions.attemptSignInSucceed(successResponse.data))
      .put(startLoading())
      .put(stopLoading())
      .put(push(CUSTOMER_INDEX_ROUTE))
      .run();

    expect(result.storeState.toJS()).toEqual({
      message: {},
      fields: {
        isResetPasswordFinished: false,
        isResetPasswordVerificationCodeSent: false,
        isSignUpVerificationCodeSent: false,
        isSignUpFinished: false,
      },
      error: {},
    });

    expect(localStorage.store).toEqual({
      token: 'cognitoIdToken', user_id: '1',
    });
  });

  it('handles failed login state change', async () => {
    const result = await expectSaga(attemptSignIn, { payload: { data: apiRequest } })
      .withReducer(AuthReducer)
      .provide([
        [matchers.call.fn(Api.attemptSignIn), throwError({ response: errorResponse })],
      ])
      .put(startLoading())
      .put(stopLoading())
      .put(Actions.attemptSignInFailed(errorResponse.data))
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
  });
});

describe('attemptSignIn generator function', () => {
  const generator = attemptSignIn({ payload: { data: apiRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptSignIn function', () => {
    expect(generator.next(apiRequest).value)
      .toEqual(call(Api.attemptSignIn, apiRequest));
  });

  test('must dispatch attemptSignInSucceed action', () => {
    expect(generator.next(successResponse).value)
      .toEqual(put(Actions.attemptSignInSucceed(successResponse.data)));
  });

  test('must dispatch stopLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(stopLoading()));
  });

  test('must push to Customer Index route', () => {
    expect(generator.next().value)
      .toEqual(put(push(CUSTOMER_INDEX_ROUTE)));
  });

  test('generator has yielded all values', () => {
    expect(generator.next().done)
      .toBe(true);
  });
});

describe('attemptSignIn request failure', () => {
  const generator = attemptSignIn({ payload: { data: apiRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptSignIn function', () => {
    expect(generator.next(apiRequest).value)
      .toEqual(call(Api.attemptSignIn, apiRequest));
  });

  test('dispatch attemptSignInFailed action', () => {
    expect(generator.throw({ response: errorResponse }).value)
      .toEqual(put(Actions.attemptSignInFailed(errorResponse.data)));
  });

  test('dispatch stop Loading action', () => {
    expect(generator.next().value)
      .toEqual(put(stopLoading()));
  });

  test('generator has yielded all values', () => {
    expect(generator.next().done).toBe(true);
  });
});
