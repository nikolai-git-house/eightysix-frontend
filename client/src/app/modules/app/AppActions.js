import { actions } from './AppReducer';

export function startLoading() {
  return { type: actions.START_LOADING };
}

export function stopLoading() {
  return { type: actions.STOP_LOADING };
}

export function toggleSearch(data) {
  return { type: actions.TOGGLE_SEARCH, payload: { data } };
}

export function toggleNav(data) {
  return { type: actions.TOGGLE_NAV, payload: { data } };
}
