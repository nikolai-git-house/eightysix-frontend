import { fromJS } from 'immutable';

export const actions = {
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
  TOGGLE_SEARCH: 'TOGGLE_SEARCH',
  TOGGLE_NAV: 'TOGGLE_NAV',
};

const defaultState = fromJS({
  loading: false,
  showSearch: false,
  showNav: false,
});

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.START_LOADING:
      return state.set('loading', true);

    case actions.STOP_LOADING:
      return state.set('loading', false);

    case actions.TOGGLE_SEARCH:
      return state
        .set('showSearch', !state.get('showSearch'));

    case actions.TOGGLE_NAV:
      return state
        .set('showNav', !state.get('showNav'));

    default:
      return state;
  }
};
