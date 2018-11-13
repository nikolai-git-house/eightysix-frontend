import { fromJS } from 'immutable';

export const actions = {
  ATTEMPT_GET_ALL_CUSTOMERS: 'ATTEMPT_GET_ALL_CUSTOMERS',
  ATTEMPT_GET_ALL_CUSTOMERS_SUCCEED: 'ATTEMPT_GET_ALL_CUSTOMERS_SUCCEED',
  ATTEMPT_GET_ALL_CUSTOMERS_FAILED: 'ATTEMPT_GET_ALL_CUSTOMERS_FAILED',
  ATTEMPT_FOLLOW_CUSTOMER: 'ATTEMPT_FOLLOW_CUSTOMER',
  ATTEMPT_FOLLOW_CUSTOMER_SUCCEED: 'ATTEMPT_FOLLOW_CUSTOMER_SUCCEED',
  ATTEMPT_FOLLOW_CUSTOMER_FAILED: 'ATTEMPT_FOLLOW_CUSTOMER_FAILED',
  ATTEMPT_UNFOLLOW_CUSTOMER: 'ATTEMPT_UNFOLLOW_CUSTOMER',
  ATTEMPT_UNFOLLOW_CUSTOMER_SUCCEED: 'ATTEMPT_UNFOLLOW_CUSTOMER_SUCCEED',
  ATTEMPT_UNFOLLOW_CUSTOMER_FAILED: 'ATTEMPT_UNFOLLOW_CUSTOMER_FAILED',
};

const defaultState = fromJS({
  customers: [],
  totalCount: 0,
  error: {},
  message: {},
});

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.ATTEMPT_GET_ALL_CUSTOMERS_SUCCEED:
      return state
        .set('customers', payload.data.offset > 0
          ? state.get('customers').concat(fromJS(payload.data.customers))
          : fromJS(payload.data.customers))
        .set('totalCount', payload.data.totalCount);

    case actions.ATTEMPT_GET_ALL_CUSTOMERS_FAILED:
      return state
        .set('error', fromJS({ status: payload.data.code, exception: payload.data.error }))
        .set('message', fromJS({ type: 'danger', text: payload.data.message }));

    case actions.ATTEMPT_FOLLOW_CUSTOMER_SUCCEED:
      return state
        .update('customers', customers => (
          customers.map((item) => {
            if (item.get('id') === payload.data.id) {
              return item.set('u_id', parseInt(payload.data.user_id, 10));
            }
            return item;
          })
        ));

    case actions.ATTEMPT_FOLLOW_CUSTOMER_FAILED:
      return state
        .set('error', fromJS({ status: payload.data.code, exception: payload.data.error }))
        .set('message', fromJS({ type: 'danger', text: payload.data.message }));

    case actions.ATTEMPT_UNFOLLOW_CUSTOMER_SUCCEED:
      return state
        .update('customers', customers => (
          customers.map((item) => {
            if (item.get('id') === payload.data.id) {
              return item.set('u_id', null);
            }
            return item;
          })
        ));

    case actions.ATTEMPT_UNFOLLOW_CUSTOMER_FAILED:
      return state
        .set('error', fromJS({ status: payload.data.code, exception: payload.data.error }))
        .set('message', fromJS({ type: 'danger', text: payload.data.message }));

    default:
      return state;
  }
};
