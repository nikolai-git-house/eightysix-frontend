import { actions } from './CustomerIndexReducer';

export function attemptGetCustomers(data) {
  return { type: actions.ATTEMPT_GET_CUSTOMERS, payload: { data } };
}

export function attemptGetCustomersSucceed(data) {
  return { type: actions.ATTEMPT_GET_CUSTOMERS_SUCCEED, payload: { data } };
}

export function attemptGetCustomersFailed(data) {
  return { type: actions.ATTEMPT_GET_CUSTOMERS_FAILED, payload: { data } };
}
