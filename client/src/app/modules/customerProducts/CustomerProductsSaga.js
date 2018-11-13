import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as Api from 'api/CustomerProductsApi';
import { LOGIN_ROUTE } from 'configs/constants';
import { actions } from './CustomerProductsReducer';
import * as Actions from './CustomerProductsActions';
import { startLoading, stopLoading } from '../app/AppActions';
import { purgeUser } from '../authorisation/AuthActions';

export function* attemptGetProducts({ payload: { data } }) {
  try {
    yield put(startLoading());
    const response = yield call(Api.attemptGetProducts, data);
    yield put(Actions.attemptGetProductsSucceed({
      products: response.data.products,
      totalCount: response.data.totalCount,
      offset: data.offset,
    }));
    yield put(stopLoading());
  } catch ({ response }) {
    if (response.status === 401) {
      yield put(purgeUser());
      yield put(push(LOGIN_ROUTE));
    } else {
      yield put(Actions.attemptGetProductsFailed(response.data));
    }
    yield put(stopLoading());
  }
}

export function* attemptShowHideProduct({ payload: { data } }) {
  try {
    yield call(Api.attemptShowHideProduct, data);
    yield put(Actions.attemptShowHideProductSucceed(data));
  } catch ({ response }) {
    if (response.status === 401) {
      yield put(purgeUser());
      yield put(push(LOGIN_ROUTE));
    } else {
      yield put(Actions.attemptShowHideProductFailed(response));
    }
  }
}

function* ProductSaga() {
  yield takeLatest(actions.ATTEMPT_GET_PRODUCTS, attemptGetProducts);
  yield takeLatest(actions.ATTEMPT_ACTIVE_PRODUCT, attemptShowHideProduct);
}

export default ProductSaga;
