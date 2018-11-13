import { fromJS } from 'immutable';

export const actions = {
  ATTEMPT_GET_CUSTOMERS: 'ATTEMPT_GET_CUSTOMERS',
  ATTEMPT_GET_CUSTOMERS_SUCCEED: 'ATTEMPT_GET_CUSTOMERS_SUCCEED',
  ATTEMPT_GET_CUSTOMERS_FAILED: 'ATTEMPT_GET_CUSTOMERS_FAILED',
};

const defaultState = fromJS({
  customers: [],
  totalCount: 0,
  error: {},
  message: {},
});

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.ATTEMPT_GET_CUSTOMERS_SUCCEED:
      return state
        .set('customers', payload.data.offset > 0
          ? state.get('customers').concat(fromJS(payload.data.customers))
          : fromJS(payload.data.customers))
        .set('totalCount', payload.data.totalCount);

    case actions.ATTEMPT_GET_CUSTOMERS_FAILED:
      return state
        .set('error', fromJS({ status: payload.data.code, exception: payload.data.error }))
        .set('message', fromJS({ type: 'danger', text: payload.data.message }));

    default:
      return state;
  }
};
