import { fromJS } from 'immutable';

export const actions = {
  ATTEMPT_GET_CUSTOMER: 'ATTEMPT_GET_CUSTOMER',
  ATTEMPT_GET_CUSTOMER_SUCCEED: 'ATTEMPT_GET_CUSTOMER_SUCCEED',
  ATTEMPT_GET_CUSTOMER_FAILED: 'ATTEMPT_GET_CUSTOMER_FAILED',
  SHOW_OVER_DUE_ACTION: 'SHOW_OVER_DUE_ACTION',
  SHOW_NEW_NOTE_ACTION: 'SHOW_NEW_NOTE_ACTION',
};

const defaultState = fromJS({
  customer: {},
  error: {},
});

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.ATTEMPT_GET_CUSTOMER_SUCCEED:
      return state
        .set('customer', fromJS(payload.data));

    case actions.ATTEMPT_GET_CUSTOMER_FAILED:
      return state
        .set('error', fromJS({ message: payload.data.message, status: payload.data.status }));

    default:
      return state;
  }
};
