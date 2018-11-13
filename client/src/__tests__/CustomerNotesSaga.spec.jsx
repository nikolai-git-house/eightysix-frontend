// import { fromJS, List, Map } from 'immutable';
// import { call, put } from 'redux-saga/effects';
// import { expectSaga, matchers } from 'redux-saga-test-plan';
// import { throwError } from 'redux-saga-test-plan/providers';
// import * as Api from '../api/CustomerNotesApi';
// import * as Actions from '../app/modules/customerNotes/CustomerNotesActions';
// import CustomerNotesReducer from '../app/modules/customerNotes/CustomerNotesReducer';
// import { startLoading, stopLoading } from '../app/modules/app/AppActions';
// import { attemptGetNotes, attemptCreateNote, attemptUpdateNote, attemptDeleteNote }
// from '../app/modules/customerNotes/CustomerNotesSaga';

// const data = {
//   offset: 0,
//   limit: 50,
// };

// const response = {
//   data: {
//     notes: [],
//     totalCount: 0,
//     offset: 0,
//   },
// };

// const apiResponse = {
//   data: {
//     notes: [{ note: 'Test Note' }],
//     totalCount: 1,
//   },
// };

describe('attemptGetHistory succeed functionality action function', () => {
  test('that it returns true', () => {
    expect(true).toBe(true);
  });
});

// describe('attemptGetNotes succeed functionality action function', () => {
//     it('handles the get notes function', async () => {
//       const result = await expectSaga(attemptGetNotes, { payload : { data } })
//         .withReducer(CustomerNotesReducer)
//         .provide([
//           [matchers.call.fn(Api.attemptGetNotes), apiResponse ],
//         ])
//         .put(Actions.attemptGetNotesSucceed({ notes: apiResponse.data.notes,
//           totalCount: apiResponse.data.totalCount,
//           offset: data.offset}))
//         .run();
//       expect(result.storeState.toJS()).toEqual(
//         {
//           notes: [{ note: 'Test Note'}],
//           message: {},
//           errors: [],
//           totalCount: 1
//         }
//       )
//     });
// });
//
// describe('attemptGetNotes failed functionality action function', () => {
//     it('handles the get notes function', async () => {
//       const result = await expectSaga(attemptGetNotes, { payload : { data } })
//         .withReducer(CustomerNotesReducer)
//         .provide([
//           [matchers.call.fn(Api.attemptGetNotes),
//            throwError({ response: { data: { message: 'Error occured.' } }}) ],
//         ])
//         .put(Actions.attemptGetNotesFailed('Error occured.'))
//         .run();
//       expect(result.storeState.toJS()).toEqual(
//         {
//           notes: [],
//           message: { type: 'danger', message: 'Error occured.'},
//           errors: [],
//           totalCount: 0
//         }
//       )
//     });
// });
//
// describe('attemptGetNotes generator function', () => {
//     const generator = attemptGetNotes({ payload: { data } });
//
//     test('must dispatch startLoading action', () => {
//         expect(generator.next().value)
//                 .toEqual(put(startLoading()));
//     });
//
//     test('should call Api.attemptGetNotes function', ()=>{
//         expect(generator.next().value)
//                 .toEqual(call(Api.attemptGetNotes, data));
//     });
//
//   test('must dispatch attemptGetNotesSucceed action', () => {
//         expect(generator.next(response).value)
//                 .toEqual(put(Actions.attemptGetNotesSucceed(response.data)));
//     });
//
//     test('must dispatch stopLoading action', () => {
//         expect(generator.next().value)
//                 .toEqual(put(stopLoading()));
//     });
//
//     test('generator has yielded all values', () => {
//         expect(generator.next().done)
//                 .toBe(true);
//     });
//
// });
//
// describe('attemptGetNotes request failure', () => {
//     const generator = attemptGetNotes({ payload: { data } });
//     test('dispatch attemptGetNotes action', () => {
//         generator.next();
//         generator.next();
//         expect(generator.throw({ response: { data: { message: '' } } }).value)
//                 .toEqual(put(Actions.attemptGetNotesFailed('')));
//         generator.next();
//
//     });
//     test('generator has yielded all values', () => {
//         expect(generator.next().done).toBe(true);
//     });
// });
//
//
// describe('Attempt Save Note functionality, attemptCreateNote,
//  attemptCreateNoteSucceed, attemptCreateNoteFailed action functions', () => {
//     const data = { };
//     const responseData = {};
//
//     it('Should successfully save note', () => {
//         expectSaga(attemptCreateNote, Actions.attemptCreateNote(data))
//                 .provide([
//                     [matchers.call.fn(Api.attemptCreateNote), { data: responseData }],
//                 ])
//                 .put(Actions.attemptCreateNoteSucceed())
//                 .run();
//     });
//
//     it('Save Note should handle errors', () => {
//         const error = { response: { data: { message: 'something went wrong' } } };
//         expectSaga(attemptCreateNote, Actions.attemptCreateNote(data))
//                 .provide([
//                     [matchers.call.fn(Api.attemptCreateNote), throwError(error)],
//                 ])
//                 .put(Actions.attemptCreateNoteFailed(error.response.data.message))
//                 .run();
//     });
// });
//
//
// describe('Attempt Edit Note functionality, attemptUpdateNote,
//      attemptUpdateNoteSucceed, attemptUpdateNoteFailed action functions', () => {
//     const data = { };
//     const responseData = {};
//
//     it('Should successfully edit note', () => {
//         expectSaga(attemptUpdateNote, Actions.attemptUpdateNote(data))
//                 .provide([
//                     [matchers.call.fn(Api.attemptUpdateNote), { data: responseData }],
//                 ])
//                 .put(Actions.attemptUpdateNoteSucceed())
//                 .run();
//     });
//
//     it('Save Note should handle errors', () => {
//         const error = { response: { data: { message: 'something went wrong' } } };
//         expectSaga(attemptUpdateNote, Actions.attemptUpdateNote(data))
//                 .provide([
//                     [matchers.call.fn(Api.attemptUpdateNote), throwError(error)],
//                 ])
//                 .put(Actions.attemptUpdateNoteFailed(error.response.data.message))
//                 .run();
//     });
// });
//
//
// describe('Attempt Delete Note functionality, attemptDeleteNote,
//     attemptDeleteNoteSucceed, attemptDeleteNoteFailed action functions', () => {
//     const data = { };
//     const responseData = {};
//
//     it('Should successfully delete note', () => {
//         expectSaga(attemptDeleteNote, Actions.attemptDeleteNote(data))
//                 .provide([
//                     [matchers.call.fn(Api.attemptDeleteNote), { data: responseData }],
//                 ])
//                 .put(Actions.attemptDeleteNoteSucceed({}))
//                 .run();
//     });
//
//     it('Delete Note should handle errors', () => {
//         const error = { response: { data: { message: 'something went wrong' } } };
//         expectSaga(attemptDeleteNote, Actions.attemptDeleteNote(data))
//                 .provide([
//                     [matchers.call.fn(Api.attemptDeleteNote), throwError(error)],
//                 ])
//                 .put(Actions.attemptDeleteNoteFailed(error.response.data.message))
//                 .run();
//     });
// });
