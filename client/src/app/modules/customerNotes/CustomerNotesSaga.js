import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as Api from 'api/CustomerNotesApi';
import { LOGIN_ROUTE } from 'configs/constants';
import { actions } from './CustomerNotesReducer';
import * as Actions from './CustomerNotesActions';
import { startLoading, stopLoading } from '../app/AppActions';
import { purgeUser } from '../authorisation/AuthActions';

export function* attemptGetNotes({ payload: { data } }) {
  try {
    yield put(startLoading());
    const response = yield call(Api.attemptGetNotes, data);
    yield put(Actions.attemptGetNotesSucceed({
      notes: response.data.notes,
      offset: data.offset,
      totalCount: response.data.totalCount,
    }));
    yield put(stopLoading());
  } catch ({ response }) {
    if (response.status === 401) {
      yield put(purgeUser());
      yield put(push(LOGIN_ROUTE));
    } else {
      yield put(Actions.attemptGetNotesFailed(response));
    }
    yield put(stopLoading());
  }
}

export function* attemptCreateNote({ payload: { data } }) {
  try {
    const response = yield call(Api.attemptCreateNote, data);
    yield put(Actions.attemptCreateNoteSucceed(response.data.note));
  } catch ({ response }) {
    if (response.status === 401) {
      yield put(purgeUser());
      yield put(push(LOGIN_ROUTE));
    } else {
      yield put(Actions.attemptCreateNoteFailed(response));
    }
  }
}

export function* attemptUpdateNote({ payload: { data } }) {
  try {
    const response = yield call(Api.attemptUpdateNote, data);
    yield put(Actions.attemptUpdateNoteSucceed(response.data.note));
  } catch ({ response }) {
    if (response.status === 401) {
      yield put(purgeUser());
      yield put(push(LOGIN_ROUTE));
    } else {
      yield put(Actions.attemptUpdateNoteFailed(response));
    }
  }
}

export function* attemptDeleteNote({ payload: { data } }) {
  try {
    yield call(Api.attemptDeleteNote, data);
    yield put(Actions.attemptDeleteNoteSucceed(data));
  } catch ({ response }) {
    if (response.status === 401) {
      yield put(purgeUser());
      yield put(push(LOGIN_ROUTE));
    } else {
      yield put(Actions.attemptDeleteNoteFailed(response));
    }
  }
}

function* CustomerNotesSaga() {
  yield takeLatest(actions.ATTEMPT_GET_NOTES, attemptGetNotes);
  yield takeLatest(actions.ATTEMPT_CREATE_NOTE, attemptCreateNote);
  yield takeLatest(actions.ATTEMPT_UPDATE_NOTE, attemptUpdateNote);
  yield takeLatest(actions.ATTEMPT_DELETE_NOTE, attemptDeleteNote);
}

export default CustomerNotesSaga;
