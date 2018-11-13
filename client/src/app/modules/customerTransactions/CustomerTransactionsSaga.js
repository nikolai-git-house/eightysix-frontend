import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as Api from 'api/CustomerTransactionsApi';
import { LOGIN_ROUTE } from 'configs/constants';
import { actions } from './CustomerTransactionsReducer';
import * as Actions from './CustomerTransactionsActions';
import { startLoading, stopLoading } from '../app/AppActions';
import { purgeUser } from '../authorisation/AuthActions';

export function* attemptGetHistory({ payload: { data } }) {
  try {
    yield put(startLoading());
    const response = yield call(Api.attemptGetHistory, data);
    yield put(Actions.attemptGetHistorySucceed({
      orders: response.data.orders,
      offset: data.offset,
      totalCount: response.data.totalCount,
    }));
    yield put(stopLoading());
  } catch ({ response }) {
    if (response.status === 401) {
      yield put(purgeUser());
      yield put(push(LOGIN_ROUTE));
    } else {
      yield put(Actions.attemptGetHistoryFailed(response));
    }
    yield put(stopLoading());
  }
}

function* CustomerTransactionsSaga() {
  yield takeLatest(actions.ATTEMPT_GET_HISTORY, attemptGetHistory);
}

export default CustomerTransactionsSaga;
