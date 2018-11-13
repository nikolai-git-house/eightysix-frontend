import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as Api from 'api/AuthApi';
import { CUSTOMER_INDEX_ROUTE, LOGIN_ROUTE } from 'configs/constants';
import * as Actions from './AuthActions';
import { actions } from './AuthReducer';
import { startLoading, stopLoading } from '../app/AppActions';

export function* attemptSignIn({ payload: { data } }) {
  try {
    yield put(startLoading());
    const response = yield call(Api.attemptSignIn, data);
    yield put(Actions.attemptSignInSucceed(response.data));
    yield put(stopLoading());
    yield put(push(CUSTOMER_INDEX_ROUTE));
  } catch ({ response }) {
    yield put(Actions.attemptSignInFailed(response.data));
    yield put(stopLoading());
  }
}

export function* attemptSignOut({ payload: { data } }) {
  try {
    yield put(startLoading());
    yield call(Api.attemptSignOut, data);
    yield put(Actions.attemptSignOutSucceed());
    yield put(stopLoading());
    yield put(push(LOGIN_ROUTE));
  } catch ({ response }) {
    yield put(Actions.attemptSignOutFailed(response.data));
    yield put(stopLoading());
  }
}

export function* attemptRequestPasswordReset({ payload: { data } }) {
  try {
    yield put(startLoading());
    yield call(Api.attemptRequestPasswordReset, data);
    yield put(Actions.attemptRequestPasswordResetSucceed());
    yield put(stopLoading());
  } catch ({ response }) {
    yield put(Actions.attemptRequestPasswordResetFailed(response.data));
    yield put(stopLoading());
  }
}

export function* attemptSetNewPassword({ payload: { data } }) {
  try {
    yield put(startLoading());
    const response = yield call(Api.attemptSetNewPassword, data);
    yield put(Actions.attemptSetNewPasswordSucceed());
    yield put(stopLoading());
    yield put(push(LOGIN_ROUTE));
  } catch ({ response }) {
    yield put(Actions.attemptSetNewPasswordFailed(response.data));
    yield put(stopLoading());
  }
}

export function* attemptSignUp({ payload: { data } }) {
  try {
    yield put(startLoading());
    yield call(Api.attemptSignUp, data);
    yield put(Actions.attemptSignUpSucceed());
    yield put(stopLoading());
  } catch ({ response }) {
    yield put(Actions.attemptSignUpFailed(response.data));
    yield put(stopLoading());
  }
}

export function* attemptSignUpVerification({ payload: { data } }) {
  try {
    yield put(startLoading());
    const response = yield call(Api.attemptSignUpVerification, data);
    yield put(Actions.attemptSignUpVerificationSucceed(response.data));
    yield put(stopLoading());
    yield put(push(LOGIN_ROUTE));
  } catch ({ response }) {
    yield put(Actions.attemptSignUpVerificationFailed(response.data));
    yield put(stopLoading());
  }
}

function* AuthSaga() {
  yield takeLatest(actions.ATTEMPT_SIGN_IN, attemptSignIn);
  yield takeLatest(actions.ATTEMPT_REQUEST_RESET_PASSWORD, attemptRequestPasswordReset);
  yield takeLatest(actions.ATTEMPT_SET_NEW_PASSWORD, attemptSetNewPassword);
  yield takeLatest(actions.ATTEMPT_SIGN_UP, attemptSignUp);
  yield takeLatest(actions.ATTEMPT_SIGN_UP_VERIFICATION, attemptSignUpVerification);
  yield takeLatest(actions.ATTEMPT_SIGN_OUT, attemptSignOut);
}

export default AuthSaga;
