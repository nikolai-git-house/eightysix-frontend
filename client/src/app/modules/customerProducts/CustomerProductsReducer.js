import { fromJS } from 'immutable';

export const actions = {
  ATTEMPT_GET_PRODUCTS: 'ATTEMPT_GET_PRODUCTS',
  ATTEMPT_GET_PRODUCTS_SUCCEED: 'ATTEMPT_GET_PRODUCTS_SUCCEED',
  ATTEMPT_GET_PRODUCTS_FAILED: 'ATTEMPT_GET_PRODUCTS_FAILED',
  ATTEMPT_ACTIVE_PRODUCT: 'ATTEMPT_ACTIVE_PRODUCT',
  ATTEMPT_ACTIVE_PRODUCT_SUCCEED: 'ATTEMPT_ACTIVE_PRODUCT_SUCCEED',
  ATTEMPT_ACTIVE_PRODUCT_FAILED: 'ATTEMPT_ACTIVE_PRODUCT_FAILED',
};


const defaultState = fromJS({
  error: {},
  message: {},
  products: [],
  totalCount: 0,
});

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case actions.ATTEMPT_GET_PRODUCTS_SUCCEED:
      return state
        .set('products', payload.data.offset > 0
          ? state.get('products').concat(fromJS(payload.data.products))
          : fromJS(payload.data.products))
        .set('totalCount', payload.data.totalCount);

    case actions.ATTEMPT_GET_PRODUCTS_FAILED:
      return state
        .set('error', fromJS({ status: payload.data.code, exception: payload.data.error } || {}))
        .set('message', fromJS({ type: 'danger', message: payload.data.message }));

    case actions.ATTEMPT_ACTIVE_PRODUCT_SUCCEED:
      return state
        .update('products', products => (
          products.map((item) => {
            if (item.get('id') === payload.data.customerProductId) {
              return item.set('active', payload.data.active);
            }
            return item;
          })
        ));

    case actions.ATTEMPT_ACTIVE_PRODUCT_FAILED:
      return state
        .set('error', fromJS({ message: payload.data.message, status: payload.data.status }));

    default:
      return state;
  }
};
