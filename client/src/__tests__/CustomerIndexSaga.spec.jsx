import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { expectSaga, matchers } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { attemptGetCustomers } from '../app/modules/customerIndex/CustomerIndexSaga';
import { purgeUser } from '../app/modules/authorisation/AuthActions';
import * as Actions from '../app/modules/customerIndex/CustomerIndexActions';
import { startLoading, stopLoading } from '../app/modules/app/AppActions';
import CustomerIndexReducer from '../app/modules/customerIndex/CustomerIndexReducer';
import * as Api from '../api/CustomerIndexApi';
import { LOGIN_ROUTE } from '../configs/constants';

const customerRequest = {
  searchTitle: '',
  searchCode: '',
  sortBy: 'month_value',
  descending: true,
  offset: 0,
  limit: 50,
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

describe('attemptGetCustomers action sagas', () => {
  it('handles successful get customers request', async () => {
    const result = await expectSaga(attemptGetCustomers, { payload: { data: customerRequest } })
      .withReducer(CustomerIndexReducer)
      .provide([
        [matchers.call.fn(Api.attemptGetCustomers), successResponse],
      ])
      .put(Actions.attemptGetCustomersSucceed({
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
    const result = await expectSaga(attemptGetCustomers, { payload: { data: customerRequest } })
      .withReducer(CustomerIndexReducer)
      .provide([
        [matchers.call.fn(Api.attemptGetCustomers), throwError({ response: errorResponse })],
      ])
      .put(Actions.attemptGetCustomersFailed(errorResponse.data))
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
    const result = await expectSaga(attemptGetCustomers, { payload: { data: customerRequest } })
      .withReducer(CustomerIndexReducer)
      .provide([
        [matchers.call.fn(Api.attemptGetCustomers), throwError({ response: unauthorisedResponse })],
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


describe('successful attemptGetCustomers generator', () => {
  const generator = attemptGetCustomers({ payload: { data: customerRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptGetCustomers function', () => {
    expect(generator.next(customerRequest).value)
      .toEqual(call(Api.attemptGetCustomers, customerRequest));
  });

  test('must dispatch attemptGetCustomersSucceed action', () => {
    expect(generator.next(successResponse).value)
      .toEqual(put(Actions.attemptGetCustomersSucceed({
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

describe('attemptGetCustomers request failure', () => {
  const generator = attemptGetCustomers({ payload: { data: customerRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptGetCustomers function', () => {
    expect(generator.next(customerRequest).value)
      .toEqual(call(Api.attemptGetCustomers, customerRequest));
  });

  test('must dispatch attemptGetCustomersFailed action', () => {
    expect(generator.throw({ response: errorResponse }).value)
      .toEqual(put(Actions.attemptGetCustomersFailed(errorResponse.data)));
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

describe('attemptGetCustomers unauthorised response', () => {
  const generator = attemptGetCustomers({ payload: { data: customerRequest } });

  test('must dispatch startLoading action', () => {
    expect(generator.next().value)
      .toEqual(put(startLoading()));
  });

  test('should call Api.attemptGetCustomers function', () => {
    expect(generator.next(customerRequest).value)
      .toEqual(call(Api.attemptGetCustomers, customerRequest));
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
