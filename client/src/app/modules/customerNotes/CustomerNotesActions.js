import { actions } from './CustomerNotesReducer';

export function attemptGetNotes(data) {
  return { type: actions.ATTEMPT_GET_NOTES, payload: { data } };
}

export function attemptGetNotesSucceed(data) {
  return { type: actions.ATTEMPT_GET_NOTES_SUCCEED, payload: { data } };
}

export function attemptGetNotesFailed(data) {
  return { type: actions.ATTEMPT_GET_NOTES_FAILED, payload: { data } };
}

export function attemptUpdateNote(data) {
  return { type: actions.ATTEMPT_UPDATE_NOTE, payload: { data } };
}

export function attemptUpdateNoteSucceed(data) {
  return { type: actions.ATTEMPT_UPDATE_NOTE_SUCCEED, payload: { data } };
}

export function attemptUpdateNoteFailed(data) {
  return { type: actions.ATTEMPT_UPDATE_NOTE_FAILED, payload: { data } };
}

export function attemptCreateNote(data) {
  return { type: actions.ATTEMPT_CREATE_NOTE, payload: { data } };
}

export function attemptCreateNoteSucceed(data) {
  return { type: actions.ATTEMPT_CREATE_NOTE_SUCCEED, payload: { data } };
}

export function attemptCreateNoteFailed(data) {
  return { type: actions.ATTEMPT_CREATE_NOTE_FAILED, payload: { data } };
}

export function attemptDeleteNote(data) {
  return { type: actions.ATTEMPT_DELETE_NOTE, payload: { data } };
}

export function attemptDeleteNoteSucceed(data) {
  return { type: actions.ATTEMPT_DELETE_NOTE_SUCCEED, payload: { data } };
}

export function attemptDeleteNoteFailed(data) {
  return { type: actions.ATTEMPT_DELETE_NOTE_FAILED, payload: { data } };
}
