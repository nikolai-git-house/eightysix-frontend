import { all } from 'redux-saga/effects';

import AuthSaga from '../modules/authorisation/AuthSaga';
import userSettingsSaga from '../modules/userSettings/UserSettingsSaga';
import customerIndexSaga from '../modules/customerIndex/CustomerIndexSaga';
import customerProfileSaga from '../modules/customerProfile/CustomerProfileSaga';
import customerProductsSaga from '../modules/customerProducts/CustomerProductsSaga';
import customerNotesSaga from '../modules/customerNotes/CustomerNotesSaga';
import customerTransactionsSaga from '../modules/customerTransactions/CustomerTransactionsSaga';

export default function* () {
  yield all([
    AuthSaga(),
    userSettingsSaga(),
    customerIndexSaga(),
    customerProfileSaga(),
    customerProductsSaga(),
    customerNotesSaga(),
    customerTransactionsSaga(),
  ]);
}
