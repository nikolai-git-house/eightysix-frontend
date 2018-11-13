import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as Api from 'api/CustomerProfileApi';
import { LOGIN_ROUTE } from 'configs/constants';
import { actions } from './CustomerProfileReducer';
import * as Actions from './CustomerProfileActions';
import { purgeUser } from '../authorisation/AuthActions';

export function* attemptGetCustomer({ payload: { data } }) {
  try {
    const response = yield call(Api.attemptGetCustomer, data);
    yield put(Actions.attemptGetCustomerSucceed(response.data.customer));
  } catch ({ response }) {
    if (response.status === 401) {
      yield put(purgeUser());
      yield put(push(LOGIN_ROUTE));
    } else {
      yield put(Actions.attemptGetCustomerFailed(response.data));
    }
  }
}

function* CustomerProfileSaga() {
  yield takeLatest(actions.ATTEMPT_GET_CUSTOMER, attemptGetCustomer);
}

export default CustomerProfileSaga;
