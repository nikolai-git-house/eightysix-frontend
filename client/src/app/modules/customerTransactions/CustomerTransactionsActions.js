import { actions } from './CustomerTransactionsReducer';

export function attemptGetHistory(data) {
  return { type: actions.ATTEMPT_GET_HISTORY, payload: { data } };
}

export function attemptGetHistorySucceed(data) {
  return { type: actions.ATTEMPT_GET_HISTORY_SUCCEED, payload: { data } };
}

export function attemptGetHistoryFailed(data) {
  return { type: actions.ATTEMPT_GET_HISTORY_FAILED, payload: { data } };
}
