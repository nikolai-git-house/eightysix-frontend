import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as Api from 'api/CustomerIndexApi';
import { LOGIN_ROUTE } from 'configs/constants';
import { actions } from './CustomerIndexReducer';
import * as Actions from './CustomerIndexActions';
import { startLoading, stopLoading } from '../app/AppActions';
import { purgeUser } from '../authorisation/AuthActions';

export function* attemptGetCustomers({ payload: { data } }) {
  try {
    yield put(startLoading());
    const response = yield call(Api.attemptGetCustomers, data);
    yield put(Actions.attemptGetCustomersSucceed({
      customers: response.data.customers,
      offset: data.offset,
      totalCount: response.data.totalCount,
    }));
    yield put(stopLoading());
  } catch ({ response }) {
    if (response.status === 401) {
      yield put(purgeUser());
      yield put(push(LOGIN_ROUTE));
    } else {
      yield put(Actions.attemptGetCustomersFailed(response.data));
    }
    yield put(stopLoading());
  }
}

function* CustomerSaga() {
  yield takeLatest(actions.ATTEMPT_GET_CUSTOMERS, attemptGetCustomers);
}

export default CustomerSaga;
