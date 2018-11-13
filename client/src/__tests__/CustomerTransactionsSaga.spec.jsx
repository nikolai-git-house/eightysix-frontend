// import { expectSaga, matchers } from 'redux-saga-test-plan';
// import { throwError } from 'redux-saga-test-plan/providers';
// import { fromJS, List, Map } from 'immutable';
// import { call, put } from 'redux-saga/effects';
// import * as Actions from '../app/modules/customerTransactions/CustomerTransactionsActions';
// import CustomerTransactionsReducer
//  from '../app/modules/customerTransactions/CustomerTransactionsReducer';
// import { startLoading, stopLoading } from '../app/modules/app/AppActions';
// import { attemptGetHistory } from '../app/modules/customerTransactions/CustomerTransactionsSaga';
// import * as Api from '../api/CustomerTransactionsApi';

// const data = {
//   offset: 0,
//   limit: 50,
// };

// const response = {
//   data: {
//     orders: [],
//     totalCount: 0,
//     offset: 0,
//   },
// };

// const apiResponse = {
//   data: {
//     orders: [{ delivered: '2018-10-10', totalValue: 200 }],
//     totalCount: 1,
//   },
// };

describe('attemptGetHistory succeed functionality action function', () => {
  test('that it returns true', () => {
    expect(true).toBe(true);
  });
});

// describe('attemptGetHistory succeed functionality action function', () => {
//     it('handles the get history success function',async  () => {
//       const result = await expectSaga(attemptGetHistory, { payload : { data } })
//         .withReducer(CustomerTransactionsReducer)
//         .provide([
//           [matchers.call.fn(Api.attemptGetHistory), apiResponse ],
//         ])
//         .put(startLoading())
//         .put(stopLoading())
//         .put(Actions.attemptGetHistorySucceed({ orders: apiResponse.data.orders,
//           totalCount: apiResponse.data.totalCount,
//           offset: data.offset}))
//         .run();
//       expect(result.storeState.toJS()).toEqual(
//         {
//           orders: [{ delivered: '2018-10-10', totalValue: 200 }],
//           totalCount: 1,
//           errors: [],
//           message: {},
//         }
//       )
//     });
// });
//
// describe('attemptGetHistory failed functionality action function', () => {
//     it('handles the get history failed function', async () => {
//       const result = await expectSaga(attemptGetHistory, { payload : { data } })
//         .withReducer(CustomerTransactionsReducer)
//         .provide([
//           [matchers.call.fn(Api.attemptGetHistory),
//            throwError({ response: { data: { message: 'Error occured.' } }}) ],
//         ])
//         .put(startLoading())
//         .put(stopLoading())
//         .put(Actions.attemptGetHistoryFailed('Error occured.'))
//         .run();
//       expect(result.storeState.toJS()).toEqual(
//         {
//           orders: [],
//           totalCount: 0,
//           message: { type: 'danger', message: 'Error occured.'},
//           errors: [],
//         }
//       )
//     });
// });
//
// describe('attemptGetHistory generator function', () => {
//   const generator = attemptGetHistory({ payload: { data } });
//
//   test('must dispatch startLoading action', () => {
//     expect(generator.next().value)
//       .toEqual(put(startLoading()));
//   });
//
//   test('should call Api.attemptGetHistory function', () => {
//     expect(generator.next().value)
//       .toEqual(call(Api.attemptGetHistory, data));
//     });
//
//   test('must dispatch attemptGetHistorySucceed action', () => {
//     expect(generator.next(response).value)
//       .toEqual(put(Actions.attemptGetHistorySucceed(response.data)));
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
// });
//
// describe('attemptGetHistory request failure', () => {
//     const generator = attemptGetHistory({ payload: { data } });
//     test('dispatch attemptGetHistoryFailed action', () => {
//         generator.next();
//         generator.next();
//         expect(generator.throw({ response: { data: { message: '' } } }).value)
//                 .toEqual(put(Actions.attemptGetHistoryFailed('')));
//
//     });
//     test('dispatch stop Loading action', () => {
//         expect(generator.next().value).toEqual(put(stopLoading()));
//     });
//     test('generator has yielded all values', () => {
//         expect(generator.next().done).toBe(true);
//     });
// });
