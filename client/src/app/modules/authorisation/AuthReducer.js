import { fromJS, Map } from 'immutable';
import { ID_TOKEN, USER_ID } from 'configs/constants';

export const actions = {
  ATTEMPT_SIGN_IN: 'ATTEMPT_SIGN_IN',
  ATTEMPT_SIGN_IN_SUCCEED: 'ATTEMPT_SIGN_IN_SUCCEED',
  ATTEMPT_SIGN_IN_FAILED: 'ATTEMPT_SIGN_IN_FAILED',
  ATTEMPT_REQUEST_RESET_PASSWORD: 'ATTEMPT_REQUEST_RESET_PASSWORD',
  ATTEMPT_REQUEST_RESET_PASSWORD_SUCCEED: 'ATTEMPT_REQUEST_RESET_PASSWORD_SUCCEED',
  ATTEMPT_REQUEST_RESET_PASSWORD_FAILED: 'ATTEMPT_REQUEST_RESET_PASSWORD_FAILED',
  ATTEMPT_SET_NEW_PASSWORD: 'ATTEMPT_SET_NEW_PASSWORD',
  ATTEMPT_SET_NEW_PASSWORD_SUCCEED: 'ATTEMPT_SET_NEW_PASSWORD_SUCCEED',
  ATTEMPT_SET_NEW_PASSWORD_FAILED: 'ATTEMPT_SET_NEW_PASSWORD_FAILED',
  ATTEMPT_SIGN_UP: 'ATTEMPT_SIGN_UP',
  ATTEMPT_SIGN_UP_SUCCEED: 'ATTEMPT_SIGN_UP_SUCCEED',
  ATTEMPT_SIGN_UP_FAILED: 'ATTEMPT_SIGN_UP_FAILED',
  ATTEMPT_SIGN_UP_VERIFICATION: 'ATTEMPT_SIGN_UP_VERIFICATION',
  ATTEMPT_SIGN_UP_VERIFICATION_SUCCEED: 'ATTEMPT_SIGN_UP_VERIFICATION_SUCCEED',
  ATTEMPT_SIGN_UP_VERIFICATION_FAILED: 'ATTEMPT_SIGN_UP_VERIFICATION_FAILED',
  ATTEMPT_SIGN_OUT: 'ATTEMPT_SIGN_OUT',
  ATTEMPT_SIGN_OUT_SUCCEED: 'ATTEMPT_SIGN_OUT_SUCCEED',
  ATTEMPT_SIGN_OUT_FAILED: 'ATTEMPT_SIGN_OUT_FAILED',
  REFRESH_USER: 'REFRESH_USER',
  PURGE_USER: 'PURGE_USER',
};

const defaultState = fromJS({
  message: {},
  fields: {
    isResetPasswordFinished: false,
    isResetPasswordVerificationCodeSent: false,
    isSignUpVerificationCodeSent: false,
    isSignUpFinished: false,
  },
  error: {},
});

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.ATTEMPT_SIGN_IN_SUCCEED:
      localStorage.setItem(ID_TOKEN, payload.data.idToken);
      localStorage.setItem(USER_ID, payload.data.user_id);
      return state
        .set('error', Map({}))
        .set('message', Map({}))

    case actions.ATTEMPT_SIGN_IN_FAILED:
      return state
        .set('error', fromJS({ status: payload.data.code, exception: payload.data.error }))
        .set('message', fromJS({ type: 'danger', text: payload.data.message }));

    case actions.ATTEMPT_REQUEST_RESET_PASSWORD_SUCCEED:
      return state
        .set('error', Map({}))
        .set('message', Map({}))
        .updateIn(['fields', 'isResetPasswordVerificationCodeSent'], () => true)
        .updateIn(['fields', 'isResetPasswordFinished'], () => false);

    case actions.ATTEMPT_REQUEST_RESET_PASSWORD_FAILED:
      return state
        .set('error', fromJS({ status: payload.data.code, exception: payload.data.error }))
        .set('message', fromJS({ type: 'danger', text: payload.data.message }));

    case actions.ATTEMPT_SET_NEW_PASSWORD_SUCCEED:
      return state
        .set('error', Map({}))
        .set('message', Map({}))
        .updateIn(['fields', 'isResetPasswordVerificationCodeSent'], () => false)
        .updateIn(['fields', 'isResetPasswordFinished'], () => true);

    case actions.ATTEMPT_SET_NEW_PASSWORD_FAILED:
      return state
        .set('error', fromJS({ status: payload.data.code, exception: payload.data.error }))
        .set('message', fromJS({ type: 'danger', text: payload.data.message }));

    case actions.ATTEMPT_SIGN_UP_SUCCEED:
      return state
        .set('error', Map({}))
        .set('message', Map({}))
        .updateIn(['fields', 'isSignUpVerificationCodeSent'], () => true)
        .updateIn(['fields', 'isSignUpFinished'], () => false);

    case actions.ATTEMPT_SIGN_UP_FAILED:
      return state
        .set('error', fromJS({ status: payload.data.code, exception: payload.data.error }))
        .set('message', fromJS({ type: 'danger', text: payload.data.message }));

    case actions.ATTEMPT_SIGN_UP_VERIFICATION_SUCCEED:
      return state
        .set('error', Map({}))
        .set('message', Map({}))
        .updateIn(['fields', 'isSignUpVerificationCodeSent'], () => false)
        .updateIn(['fields', 'isSignUpFinished'], () => true);

    case actions.ATTEMPT_SIGN_UP_VERIFICATION_FAILED:
      return state
        .set('error', fromJS({ status: payload.data.code, exception: payload.data.error }))
        .set('message', fromJS({ type: 'danger', text: payload.data.message }));

    case actions.ATTEMPT_SIGN_OUT_SUCCEED:
      localStorage.clear();
      return state;

    case actions.ATTEMPT_SIGN_OUT_FAILED:
      return state
        .set('error', fromJS({ status: payload.data.code, exception: payload.data.error }))
        .set('message', fromJS({ type: 'danger', text: payload.data.message }));

    case actions.PURGE_USER:
      localStorage.removeItem(ID_TOKEN);
      localStorage.removeItem(USER_ID);
      return state
        .set('error', fromJS({ status: 401, exception: 'UNAUTHORISED' }))
        .set('message', fromJS({ type: 'danger', text: 'Please login to access service.' }))

    default:
      return state;
  }
};
