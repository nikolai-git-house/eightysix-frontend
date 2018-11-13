import { actions } from './UserSettingsReducer';

export function attemptGetAllCustomers(data) {
  return { type: actions.ATTEMPT_GET_ALL_CUSTOMERS, payload: { data } };
}

export function attemptGetAllCustomersSucceed(data) {
  return { type: actions.ATTEMPT_GET_ALL_CUSTOMERS_SUCCEED, payload: { data } };
}

export function attemptGetAllCustomersFailed(data) {
  return { type: actions.ATTEMPT_GET_ALL_CUSTOMERS_FAILED, payload: { data } };
}

export function attemptFollowCustomer(data) {
  return { type: actions.ATTEMPT_FOLLOW_CUSTOMER, payload: { data } };
}

export function attemptFollowCustomerSucceed(data) {
  return { type: actions.ATTEMPT_FOLLOW_CUSTOMER_SUCCEED, payload: { data } };
}

export function attemptFollowCustomerFailed(data) {
  return { type: actions.ATTEMPT_FOLLOW_CUSTOMER_FAILED, payload: { data } };
}

export function attemptUnfollowCustomer(data) {
  return { type: actions.ATTEMPT_UNFOLLOW_CUSTOMER, payload: { data } };
}

export function attemptUnfollowCustomerSucceed(data) {
  return { type: actions.ATTEMPT_UNFOLLOW_CUSTOMER_SUCCEED, payload: { data } };
}

export function attemptUnfollowCustomerFailed(data) {
  return { type: actions.ATTEMPT_UNFOLLOW_CUSTOMER_FAILED, payload: { data } };
}
