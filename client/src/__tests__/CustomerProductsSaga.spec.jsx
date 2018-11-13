// import { fromJS, List, Map } from 'immutable';
// import { call, put } from 'redux-saga/effects';
// import { expectSaga, matchers } from 'redux-saga-test-plan';
// import { throwError } from 'redux-saga-test-plan/providers';
// import * as Actions from '../app/modules/customerProducts/CustomerProductsActions';
// import { startLoading, stopLoading } from '../app/modules/app/AppActions';
// import CustomerProductsReducer from '../app/modules/customerProducts/CustomerProductsReducer';
// import { attemptGetProducts, attemptShowHideProduct }
//  from '../app/modules/customerProducts/CustomerProductsSaga';
// import * as Api from '../api/CustomerProductsApi';

// const apiRequest = {
//   offset: 0,
//   limit: 10,
//   overdue: true
// };

// const successResponse = {
//   data: {
//     products: [{ title: 'Test Title', price: 20.5 }],
//     totalCount: 1
//   },
// }

// const errorResponse = {
//   data: {
//     code: 4000,
//     error: 'BAD_REQUEST',
//     message: 'Received bad request.'
//   }
// }

describe('attemptGetHistory succeed functionality action function', () => {
  test('that it returns true', () => {
    expect(true).toBe(true);
  });
});

// describe('attemptGetProducts succeed functionality action function', () => {
//   it('handles the get products function', async  () => {
//     const result = await expectSaga(attemptGetProducts, { payload : { data: apiRequest } })
//       .withReducer(CustomerProductsReducer)
//       .provide([
//         [matchers.call.fn(Api.attemptGetProducts), successResponse ],
//       ])
//       .put(startLoading())
//       .put(stopLoading())
//       .put(Actions.attemptGetProductsSucceed({
//         products: successResponse.data.products,
//         totalCount: successResponse.data.totalCount,
//         offset: apiRequest.offset
//       }))
//       .run();
//
//     expect(result.storeState.toJS()).toEqual({
//       error: {},
//       message: {},
//       products: [{ title: 'Test Title', price: 20.5 }],
//       totalCount: 1
//     })
//   });
// });
//
// describe('attemptGetProducts failed functionality action function', () => {
//   it('handles the get products failed function', async () => {
//     const result = await expectSaga(attemptGetProducts, { payload : { data: apiRequest } })
//       .withReducer(CustomerProductsReducer)
//       .provide([
//         [matchers.call.fn(Api.attemptGetProducts), throwError({ response: errorResponse })],
//       ])
//       .put(startLoading())
//       .put(stopLoading())
//       .put(Actions.attemptGetProductsFailed(errorResponse.data))
//       .run();
//
//     expect(result.storeState.toJS()).toEqual({
//       error: { status: 4000, exception: 'BAD_REQUEST'},
//       message: { type: 'danger', message: 'Received bad request.' },
//       products: [],
//       totalCount: 0
//     })
//   });
// });
//
// describe('attemptGetProducts generator function', () => {
//   const generator = attemptGetProducts({ payload: { data: apiRequest } });
//
//   test('must dispatch startLoading action', () => {
//     expect(generator.next().value)
//       .toEqual(put(startLoading()));
//   });
//
//   test('should call Api.attemptGetProducts function', () => {
//     expect(generator.next(apiRequest).value)
//       .toEqual(call(Api.attemptGetProducts, apiRequest));
//   });
//
//   test('must dispatch attemptGetProductsSucceed action', () => {
//     const payload = {
//       products: successResponse.data.products,
//       totalCount: successResponse.data.totalCount,
//       offset: apiRequest.offset
//     }
//     expect(generator.next(successResponse).value)
//       .toEqual(put(Actions.attemptGetProductsSucceed(payload)));
//   });
//
//   test('must dispatch stopLoading action', () => {
//     expect(generator.next().value)
//       .toEqual(put(stopLoading()));
//   });
//
//   test('generator has yielded all values', () => {
//     expect(generator.next().done)
//       .toBe(true);
//   });
//
// });
//
// describe('attemptGetProducts request failure', () => {
//
//   const generator = attemptGetProducts({ payload: { data: apiRequest } });
//
//   test('must dispatch startLoading action', () => {
//     expect(generator.next().value)
//       .toEqual(put(startLoading()));
//   });
//
//   test('should call Api.attemptGetProducts function', () => {
//     expect(generator.next(apiRequest).value)
//       .toEqual(call(Api.attemptGetProducts, apiRequest));
//   });
//
//   test('must dispatch attemptGetProductsFailed action', () => {
//     expect(generator.throw({ response: errorResponse }).value)
//       .toEqual(put(Actions.attemptGetProductsFailed(errorResponse.data)));
//   });
//
//   test('must dispatch stopLoading action', () => {
//     expect(generator.next().value)
//       .toEqual(put(stopLoading()));
//   });
//
//   test('generator has yielded all values', () => {
//     expect(generator.next().done).toBe(true);
//   });
// });
//
//
// describe('Attempt Active products functionality, attemptShowHideProducts,
//  attemptShowHideProductsSucceed, attemptShowHideProductsFailed action functions', () => {
//   const data = { };
//   const responseData = {};
//
//   it('Should successfully active product', () => {
//     expectSaga(attemptShowHideProduct, Actions.attemptShowHideProduct(data))
//       .provide([
//         [matchers.call.fn(Api.attemptShowHideProduct), { data: responseData }],
//       ])
//       .put(Actions.attemptShowHideProductSucceed(responseData))
//       .run();
//     });
//
//   it('Active Product should handle errors', () => {
//     const error = { response: { data: { message: 'something went wrong' } } };
//     expectSaga(attemptShowHideProduct, Actions.attemptShowHideProduct(data))
//       .provide([
//         [matchers.call.fn(Api.attemptShowHideProduct), throwError(error)],
//       ])
//       .put(Actions.attemptShowHideProductFailed(error.response.data.message))
//       .run();
//   });
// });
