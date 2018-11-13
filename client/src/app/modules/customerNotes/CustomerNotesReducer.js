import { fromJS } from 'immutable';

export const actions = {
  ATTEMPT_GET_NOTES: 'ATTEMPT_GET_NOTES',
  ATTEMPT_GET_NOTES_SUCCEED: 'ATTEMPT_GET_NOTES_SUCCEED',
  ATTEMPT_GET_NOTES_FAILED: 'ATTEMPT_GET_NOTES_FAILED',
  ATTEMPT_UPDATE_NOTE: 'ATTEMPT_UPDATE_NOTE',
  ATTEMPT_UPDATE_NOTE_SUCCEED: 'ATTEMPT_UPDATE_NOTE_SUCCEED',
  ATTEMPT_UPDATE_NOTE_FAILED: 'ATTEMPT_UPDATE_NOTE_FAILED',
  ATTEMPT_CREATE_NOTE: 'ATTEMPT_CREATE_NOTE',
  ATTEMPT_CREATE_NOTE_SUCCEED: 'ATTEMPT_CREATE_NOTE_SUCCEED',
  ATTEMPT_CREATE_NOTE_FAILED: 'ATTEMPT_CREATE_NOTE_FAILED',
  ATTEMPT_DELETE_NOTE: 'ATTEMPT_DELETE_NOTE',
  ATTEMPT_DELETE_NOTE_SUCCEED: 'ATTEMPT_DELETE_NOTE_SUCCEED',
  ATTEMPT_DELETE_NOTE_FAILED: 'ATTEMPT_DELETE_NOTE_FAILED',
};

const defaultState = fromJS({
  notes: [],
  error: {},
  totalCount: 0,
});

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.ATTEMPT_GET_NOTES_SUCCEED:
      return state
        .set('notes', payload.data.offset > 0
          ? state.get('notes').concat(fromJS(payload.data.notes))
          : fromJS(payload.data.notes))
        .set('totalCount', payload.data.totalCount);

    case actions.ATTEMPT_GET_NOTES_FAILED:
      return state
        .set('error', fromJS({ message: payload.data.message, status: payload.data.status }));

    case actions.ATTEMPT_CREATE_NOTE_SUCCEED:
      return state
        .update('notes', notes => notes.push(fromJS(payload.data)));

    case actions.ATTEMPT_CREATE_NOTE_FAILED:
      return state
        .set('error', fromJS({ message: payload.data.message, status: payload.data.status }));

    case actions.ATTEMPT_UPDATE_NOTE_SUCCEED:
      return state
        .update('notes', notes => (
          notes.map((item) => {
            if (item.get('id') === payload.data.id) {
              return fromJS(payload.data);
            }
            return item;
          })
        ));

    case actions.ATTEMPT_UPDATE_NOTE_FAILED:
      return state
        .set('error', fromJS({ message: payload.data.message, status: payload.data.status }));

    case actions.ATTEMPT_DELETE_NOTE_SUCCEED:
      return state
        .update('notes', notes => (
          notes.filter(item => (item.get('id') !== payload.data.id))
        ));

    case actions.ATTEMPT_DELETE_NOTE_FAILED:
      return state
        .set('error', fromJS({ message: payload.data.message, status: payload.data.status }));

    default:
      return state;
  }
};
