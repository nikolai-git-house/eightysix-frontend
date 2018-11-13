import { actions } from './CustomerProductsReducer';

export function attemptGetProducts(data) {
  return { type: actions.ATTEMPT_GET_PRODUCTS, payload: { data } };
}

export function attemptGetProductsSucceed(data) {
  return { type: actions.ATTEMPT_GET_PRODUCTS_SUCCEED, payload: { data } };
}

export function attemptGetProductsFailed(data) {
  return { type: actions.ATTEMPT_GET_PRODUCTS_FAILED, payload: { data } };
}

export function attemptShowHideProduct(data) {
  return { type: actions.ATTEMPT_ACTIVE_PRODUCT, payload: { data } };
}

export function attemptShowHideProductSucceed(data) {
  return { type: actions.ATTEMPT_ACTIVE_PRODUCT_SUCCEED, payload: { data } };
}

export function attemptShowHideProductFailed(data) {
  return { type: actions.ATTEMPT_ACTIVE_PRODUCT_FAILED, payload: { data } };
}
