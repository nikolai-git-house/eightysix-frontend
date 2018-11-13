import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as Api from 'api/UserSettingsApi';
import { LOGIN_ROUTE } from 'configs/constants';
import { actions } from './UserSettingsReducer';
import * as Actions from './UserSettingsActions';
import { startLoading, stopLoading } from '../app/AppActions';
import { purgeUser } from '../authorisation/AuthActions';

export function* attemptGetAllCustomers({ payload: { data } }) {
  try {
    yield put(startLoading());
    const response = yield call(Api.attemptGetAllCustomers, data);
    yield put(Actions.attemptGetAllCustomersSucceed({
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
      yield put(Actions.attemptGetAllCustomersFailed(response.data));
    }
    yield put(stopLoading());
  }
}

export function* attemptFollowCustomer({ payload: { data } }) {
  try {
    yield call(Api.attemptFollowCustomer, data);
    yield put(Actions.attemptFollowCustomerSucceed(data));
  } catch ({ response }) {
    if (response.status === 401) {
      yield put(purgeUser());
      yield put(push(LOGIN_ROUTE));
    } else {
      yield put(Actions.attemptFollowCustomerFailed(response.data));
    }
  }
}

export function* attemptUnfollowCustomer({ payload: { data } }) {
  try {
    yield call(Api.attemptUnfollowCustomer, data);
    yield put(Actions.attemptUnfollowCustomerSucceed(data));
  } catch ({ response }) {
    if (response.status === 401) {
      yield put(purgeUser());
      yield put(push(LOGIN_ROUTE));
    } else {
      yield put(Actions.attemptUnfollowCustomerFailed(response.data));
    }
  }
}


function* CustomerSaga() {
  yield takeLatest(actions.ATTEMPT_GET_ALL_CUSTOMERS, attemptGetAllCustomers);
  yield takeLatest(actions.ATTEMPT_FOLLOW_CUSTOMER, attemptFollowCustomer);
  yield takeLatest(actions.ATTEMPT_UNFOLLOW_CUSTOMER, attemptUnfollowCustomer);
}

export default CustomerSaga;
