// import { fromJS, List, Map } from 'immutable';
// import { expectSaga, matchers } from 'redux-saga-test-plan';
// import { throwError } from 'redux-saga-test-plan/providers';
// import { attemptGetCustomer } from '../app/modules/customerProfile/CustomerProfileSaga';
// import * as Actions from '../app/modules/customerProfile/CustomerProfileActions';
// import CustomerProfileReducer from '../app/modules/customerProfile/CustomerProfileReducer';
// import * as Api from '../api/CustomerProfileApi';

// const customerRequest = 50;

// const successResponse = {
//   data: {
//     customers: { title: 'Test Title', code: 123 },
//   },
// };

// const errorResponse = {
//   data: {
//     code: 4000,
//     error: 'BAD_REQUEST',
//     message: 'Received bad request.',
//   },
// };

// const unauthorisedResponse = {
//   status: 401,
//   data: {
//     code: 4010,
//     error: 'AUTHORISED',
//     message: 'Unauthorised to access resource.',
//   },
// };

describe('this is a dummy test', () => {
  test('true equals true', () => {
    expect(true).toBe(true);
  });
});

// describe('attemptGetCustomer succeed functionality action function', () => {
//   it('handles the get customer success function', async () => {
//     const result = await expectSaga(attemptGetCustomer, { payload : { data } })
//       .withReducer(CustomerProfileReducer)
//       .provide([
//         [matchers.call.fn(Api.attemptGetCustomer), apiResponse ],
//       ])
//       .put(Actions.attemptGetCustomerSucceed(apiResponse.data.customer))
//       .run();
//
//     expect(result.storeState.toJS()).toEqual(
//       {
//         customer: { title: 'David Bowe', code: 123 },
//         errors: [],
//         message: {}
//       }
//     )
//   });
// });
//
// describe('attemptGetCustomer failed functionality action function', () => {
//     it('handles the get customer failed function', async () => {
//       const result = await expectSaga(attemptGetCustomer, { payload : { data } })
//         .withReducer(CustomerProfileReducer)
//         .provide([
//           [matchers.call.fn(Api.attemptGetCustomer),
//            throwError({ response: { data: { message: 'Error occured.' } }}) ],
//         ])
//         .put(Actions.attemptGetCustomerFailed('Error occured.'))
//         .run();
//       expect(result.storeState.toJS()).toEqual(
//         {
//           customer: {},
//           errors: [],
//           message: { type: 'danger', message: 'Error occured.'},
//         }
//       )
//     });
// });
//
// describe('Get Customer Profile, attemptGetCustomer,
//    attemptGetCustomerSucceed, attemptGetCustomerFailed action functions', () => {
//
//     it('Should successfully get customer', () => {
//         expectSaga(attemptGetCustomer, Actions.attemptGetCustomer(data))
//                 .provide([
//                     [matchers.call.fn(Api.attemptGetCustomer), { data: responseData }],
//                 ])
//                 .put(Actions.attemptGetCustomerSucceed({}))
//                 .run();
//     });
//
//     it('Get Customer should handle errors', () => {
//         const error = { response: { data: { message: 'something went wrong' } } };
//         expectSaga(attemptGetCustomer, Actions.attemptGetCustomer(data))
//                 .provide([
//                     [matchers.call.fn(Api.attemptGetCustomer), throwError(error)],
//                 ])
//                 .put(Actions.attemptGetCustomerFailed(error.response.data.message))
//                 .run();
//     });
//
// });
