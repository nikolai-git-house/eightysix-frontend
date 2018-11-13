import { actions } from './CustomerProfileReducer';

export function attemptGetCustomer(data) {
  return { type: actions.ATTEMPT_GET_CUSTOMER, payload: { data } };
}

export function attemptGetCustomerSucceed(data) {
  return { type: actions.ATTEMPT_GET_CUSTOMER_SUCCEED, payload: { data } };
}

export function attemptGetCustomerFailed(data) {
  return { type: actions.ATTEMPT_GET_CUSTOMER_FAILED, payload: { data } };
}
