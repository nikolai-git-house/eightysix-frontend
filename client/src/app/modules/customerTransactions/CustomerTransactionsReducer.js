import { fromJS } from 'immutable';

export const actions = {
  ATTEMPT_GET_HISTORY: 'ATTEMPT_GET_HISTORY',
  ATTEMPT_GET_HISTORY_SUCCEED: 'ATTEMPT_GET_HISTORY_SUCCEED',
  ATTEMPT_GET_HISTORY_FAILED: 'ATTEMPT_GET_HISTORY_FAILED',
};

const defaultState = fromJS({
  orders: [],
  totalCount: 0,
  error: {},
  message: {},
});

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.ATTEMPT_GET_HISTORY_SUCCEED:
      return state
        .set('orders', payload.data.offset > 0
          ? state.get('orders').concat(fromJS(payload.data.orders))
          : fromJS(payload.data.orders))
        .set('totalCount', payload.data.totalCount);

    case actions.ATTEMPT_GET_HISTORY_FAILED:
      return state
        .set('message', fromJS({ type: 'danger', message: payload.data }));

    default:
      return state;
  }
};
