import { fromJS } from 'immutable';
import { call, put } from 'redux-saga/effects';
import { expectSaga, matchers } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { push } from 'react-router-redux';
import * as Actions from '../app/modules/userSettings/UserSettingsActions';
import { startLoading, stopLoading } from '../app/modules/app/AppActions';
import { purgeUser } from '../app/modules/authorisation/AuthActions';
import UserSettingsReducer from '../app/modules/userSettings/UserSettingsReducer';
import * as Api from '../api/UserSettingsApi';
import {
  attemptGetAllCustomers,
  attemptFollowCustomer,
  attemptUnfollowCustomer,
} from '../app/modules/userSettings/UserSettingsSaga';
import { LOGIN_ROUTE } from '../configs/constants';

const customerRequest = {
  searchTitle: '',
  searchCode: '',
  sortBy: 'month_value',
  descending: true,
  offset: 0,
  limit: 50,
};

const followRequest = {
  address: null,
  code: 'AAA',
  currency: 'EUR',
  growth: null,
  id: 1,
  last_delivered: '2018-01-01',
  modified: '2018-01-01',
  month_value: '100.00',
  supplier_id: 1,
  threatened_value: '50.00',
  title: 'Customer A',
  user_id: 1,
};

const successResponse = {
  data: {
    customers: [{ title: 'Test Title', code: 123 }],
    totalCount: 1,
  },
};

const errorResponse = {
  data: {
    code: 4000,
    error: 'BAD_REQUEST',
    message: 'Received bad request.',
  },
};

const unauthorisedResponse = {
  status: 401,
  data: {
    code: 4010,
    error: 'AUTHORISED',
    message: 'Unauthorised to access resource.',
  },
};

describe('attemptGetAllCustomers action sagas', () => {
  it('handles successful get customers request', async () => {
    const result = await expectSaga(attemptGetAllCustomers, { payload: { data: customerRequest } })
      .withReducer(UserSettingsReducer)
      .provide([
        [matchers.call.fn(Api.attemptGetAllCustomers), successResponse],
      ])
      .put(Actions.attemptGetAllCustomersSucceed({
        customers: successResponse.data.customers,
        totalCount: successResponse.data.totalCount,
        offset: customerRequest.offset,
      }))
      .put(startLoading())
      .put(stopLoading())
      .run();

    expect(result.storeState.toJS()).toEqual({
      customers: [{ title: 'Test Title', code: 123 }],
      error: {},
      message: {},
      totalCount: 1,
    });
  });

  it('handles failed get customers request', async () => {
    const result = await expectSaga(attemptGetAllCustomers, { payload: { data: customerRequest } })
      .withReducer(UserSettingsReducer)
      .provide([
        [matchers.call.fn(Api.attemptGetAllCustomers), throwError({ response: errorResponse })],
      ])
      .put(Actions.attemptGetAllCustomersFailed(errorResponse.data))
      .put(startLoading())
      .put(stopLoading())
      .run();

    expect(result.storeState.toJS()).toEqual({
      customers: [],
      error: { status: 4000, exception: 'BAD_REQUEST' },
      message: { type: 'danger', text: 'Received bad request.' },
      totalCount: 0,
    });
  });

  it('handles anauthorised get customers request', async () => {
    const result = await expectSaga(attemptGetAllCustomers, { payload: { data: customerRequest } })
      .withReducer(UserSettingsReducer)
      .provide([
        [matchers.call.fn(Api.attemptGetAllCustomers),
          throwError({ response: unauthorisedResponse })],
      ])
      .put(purgeUser())
      .put(startLoading())
      .put(stopLoading())
      .run();

    expect(result.storeState.toJS()).toEqual({
      customers: [],
      error: {},
      message: {},
      totalCount: 0,
    });
  });
});

describe('attemptFolowCustomer action sagas', () => {
  const unfollowedCustomerState = fromJS({
    customers: [{ id: 1, u_id: null }],
    error: {},
    message: {},
    totalCount: 1,
  });

  it('handles successful follow customer request', async () => {
    const result = await expectSaga(attemptFollowCustomer, { payload: { data: followRequest } })
      .withReducer(UserSettingsReducer)
      .withState(unfollowedCustomerState)
      .provide([
        [matchers.call.fn(Api.attemptFollowCustomer), {}],
      ])
      .put(Actions.attemptFollowCustomerSucceed(followRequest))
      .run();

    expect(result.storeState.toJS()).toEqual({
      customers: [{ id: 1, u_id: 1 }],
      error: {},
      message: {},
      totalCount: 1,
    });
  });

  it('handles failed follow customer request', async () => {
    const result = await expectSaga(attemptFollowCustomer, { payload: { data: followRequest } })
      .withReducer(UserSettingsReducer)
      .withState(unfollowedCustomerState)
      .provide([
        [matchers.call.fn(Api.attemptFollowCustomer), throwError({ response: errorResponse })],
      ])
      .put(Actions.attemptFollowCustomerFailed(errorResponse.data))
      .run();

    expect(result.storeState.toJS()).toEqual({
      customers: [{ id: 1, u_id: null }],
      error: { status: 4000, exception: 'BAD_REQUEST' },
      message: { type: 'danger', text: 'Received bad request.' },
      totalCount: 1,
    });
  });

  it('handles anauthorised follow customer request', async () => {
    const result = await expectSaga(attemptFollowCustomer, { payload: { data: followRequest } })
      .withReducer(UserSettingsReducer)
      .withState(unfollowedCustomerState)
      .provide([
        [matchers.call.fn(Api.attemptFollowCustomer),
          throwError({ response: unauthorisedResponse })],
      ])
      .put(purgeUser())
      .put(push(LOGIN_ROUTE))
      .run();

    expect(result.storeState.toJS()).toEqual({
      customers: [{ id: 1, u_id: null }],
      error: {},
      message: {},
      totalCount: 1,
    });
  });
});

describe('attemptUnfollowCustomer action sagas', () => {
  const followedCustomerState = fromJS({
    customers: [{ id: 1, u_id: 1 }],
    error: {},
    message: {},
    totalCount: 1,
  });

  it('handles successful unfollow customer request', async () => {
    const result = await expectSaga(attemptUnfollowCustomer, { payload: { data: followRequest } })
      .withReducer(UserSettingsReducer)
      .withState(followedCustomerState)
      .provide([
        [matchers.call.fn(Api.attemptUnfollowCustomer), {}],
      ])
      .put(Actions.attemptUnfollowCustomerSucceed(followRequest))
      .run();

    expect(result.storeState.toJS()).toEqual({
      customers: [{ id: 1, u_id: null }],
      error: {},
      message: {},
      totalCount: 1,
    });
  });

  it('handles failed unfollow customer request', async () => {
    const result = await expectSaga(attemptUnfollowCustomer, { payload: { data: followRequest } })
      .withReducer(UserSettingsReducer)
      .withState(followedCustomerState)
      .provide([
        [matchers.call.fn(Api.attemptUnfollowCustomer), throwError({ response: errorResponse })],
      ])
      .put(Actions.attemptUnfollowCustomerFailed(errorResponse.data))
      .run();

    expect(result.storeState.toJS()).toEqual({
      customers: [{ id: 1, u_id: 1 }],
      error: { status: 4000, exception: 'BAD_REQUEST' },
      message: { type: 'danger', text: 'Received bad request.' },
      totalCount: 1,
    });
  });

  it('handles anauthorised unfollow customer request', async () => {
    const result = await expectSaga(attemptUnfollowCustomer, { payload: { data: followRequest } })
      .withReducer(UserSettingsReducer)
      .withState(followedCustomerState)
      .provide([
        [matchers.call.fn(Api.attemptUnfollowCustomer),
          throwError({ response: unauthorisedResponse })],
      ])
      .put(purgeUser())
      .put(push(LOGIN_ROUTE))
      .run();

    expect(result.storeState.toJS()).toEqual({
      customers: [{ id: 1, u_id: 1 }],
      error: {},
      message: {},
      totalCount: 1,
    });
  });
});

describe('successful attemptGetAllCustomers generator', () => {
  const generator = attemptGetAllCustomers({ payload: { data: customerRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptGetCustomers function', () => {
    expect(generator.next(customerRequest).value)
      .toEqual(call(Api.attemptGetAllCustomers, customerRequest));
  });

  test('must dispatch attemptGetCustomersSucceed action', () => {
    expect(generator.next(successResponse).value)
      .toEqual(put(Actions.attemptGetAllCustomersSucceed({
        customers: successResponse.data.customers,
        totalCount: successResponse.data.totalCount,
        offset: customerRequest.offset,
      })));
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

describe('failed attemptGetAllCustomers generator', () => {
  const generator = attemptGetAllCustomers({ payload: { data: customerRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptGetCustomers function', () => {
    expect(generator.next(customerRequest).value)
      .toEqual(call(Api.attemptGetAllCustomers, customerRequest));
  });

  test('must dispatch attemptGetCustomersFailed action', () => {
    expect(generator.throw({ response: errorResponse }).value)
      .toEqual(put(Actions.attemptGetAllCustomersFailed(errorResponse.data)));
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

describe('attemptGetAllCustomers unauthorised response', () => {
  const generator = attemptGetAllCustomers({ payload: { data: customerRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptGetAllCustomers function', () => {
    expect(generator.next(customerRequest).value)
      .toEqual(call(Api.attemptGetAllCustomers, customerRequest));
  });

  test('must dispatch unauthorised action', () => {
    expect(generator.throw({ response: unauthorisedResponse }).value)
      .toEqual(put(purgeUser()));
  });

  test('must push to login route', () => {
    expect(generator.next().value)
      .toEqual(put(push(LOGIN_ROUTE)));
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

describe('successful attemptFollowCustomer generator', () => {
  const generator = attemptFollowCustomer({ payload: { data: followRequest } });

  test('should call Api.attemptFollowCustomer function', () => {
    expect(generator.next(followRequest).value)
      .toEqual(call(Api.attemptFollowCustomer, followRequest));
  });

  test('must dispatch attemptFollowCustomerSucceed action', () => {
    expect(generator.next().value)
      .toEqual(put(Actions.attemptFollowCustomerSucceed(followRequest)));
  });

  test('generator has yielded all values', () => {
    expect(generator.next().done)
      .toBe(true);
  });
});

describe('failed attemptFollowCustomer generator', () => {
  const generator = attemptFollowCustomer({ payload: { data: followRequest } });

  test('should call Api.attemptFollowCustomer function', () => {
    expect(generator.next(followRequest).value)
      .toEqual(call(Api.attemptFollowCustomer, followRequest));
  });

  test('must dispatch attemptFollowCustomerFailed action', () => {
    expect(generator.throw({ response: errorResponse }).value)
      .toEqual(put(Actions.attemptFollowCustomerFailed(errorResponse.data)));
  });

  test('generator has yielded all values', () => {
    expect(generator.next().done)
      .toBe(true);
  });
});

describe('unauthorised attemptFollowCustomer generator', () => {
  const generator = attemptFollowCustomer({ payload: { data: followRequest } });

  test('should call Api.attemptFollowCustomer function', () => {
    expect(generator.next(followRequest).value)
      .toEqual(call(Api.attemptFollowCustomer, followRequest));
  });

  test('must dispatch unauthorised action', () => {
    expect(generator.throw({ response: unauthorisedResponse }).value)
      .toEqual(put(purgeUser()));
  });

  test('must push to login route', () => {
    expect(generator.next().value)
      .toEqual(put(push(LOGIN_ROUTE)));
  });

  test('generator has yielded all values', () => {
    expect(generator.next().done)
      .toBe(true);
  });
});

describe('successful attemptUnfollowCustomer generator', () => {
  const generator = attemptUnfollowCustomer({ payload: { data: followRequest } });

  test('should call Api.attemptUnfollowCustomer function', () => {
    expect(generator.next(followRequest).value)
      .toEqual(call(Api.attemptUnfollowCustomer, followRequest));
  });

  test('must dispatch attemptUnfollowCustomerSucceed action', () => {
    expect(generator.next().value)
      .toEqual(put(Actions.attemptUnfollowCustomerSucceed(followRequest)));
  });

  test('generator has yielded all values', () => {
    expect(generator.next().done)
      .toBe(true);
  });
});

describe('failed attemptUnfollowCustomer generator', () => {
  const generator = attemptUnfollowCustomer({ payload: { data: followRequest } });

  test('should call Api.attemptUnfollowCustomer function', () => {
    expect(generator.next(followRequest).value)
      .toEqual(call(Api.attemptUnfollowCustomer, followRequest));
  });

  test('must dispatch attemptUnfollowCustomerFailed action', () => {
    expect(generator.throw({ response: errorResponse }).value)
      .toEqual(put(Actions.attemptUnfollowCustomerFailed(errorResponse.data)));
  });

  test('generator has yielded all values', () => {
    expect(generator.next().done)
      .toBe(true);
  });
});

describe('unauthorised attemptUnfollowCustomer generator', () => {
  const generator = attemptUnfollowCustomer({ payload: { data: followRequest } });

  test('should call Api.attemptUnfollowCustomer function', () => {
    expect(generator.next(followRequest).value)
      .toEqual(call(Api.attemptUnfollowCustomer, followRequest));
  });

  test('must dispatch unauthorised action', () => {
    expect(generator.throw({ response: unauthorisedResponse }).value)
      .toEqual(put(purgeUser()));
  });

  test('must push to login route', () => {
    expect(generator.next().value)
      .toEqual(put(push(LOGIN_ROUTE)));
  });

  test('generator has yielded all values', () => {
    expect(generator.next().done)
      .toBe(true);
  });
});
