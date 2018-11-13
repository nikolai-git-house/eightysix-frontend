import { actions } from './AuthReducer';

export function attemptSignIn(data) {
  return { type: actions.ATTEMPT_SIGN_IN, payload: { data } };
}

export function attemptSignInSucceed(data) {
  return { type: actions.ATTEMPT_SIGN_IN_SUCCEED, payload: { data } };
}

export function attemptSignInFailed(data) {
  return { type: actions.ATTEMPT_SIGN_IN_FAILED, payload: { data } };
}

export function attemptRequestPasswordReset(data) {
  return { type: actions.ATTEMPT_REQUEST_RESET_PASSWORD, payload: { data } };
}

export function attemptRequestPasswordResetSucceed() {
  return { type: actions.ATTEMPT_REQUEST_RESET_PASSWORD_SUCCEED };
}

export function attemptRequestPasswordResetFailed(data) {
  return { type: actions.ATTEMPT_REQUEST_RESET_PASSWORD_FAILED, payload: { data } };
}

export function attemptSetNewPassword(data) {
  return { type: actions.ATTEMPT_SET_NEW_PASSWORD, payload: { data } };
}

export function attemptSetNewPasswordSucceed() {
  return { type: actions.ATTEMPT_SET_NEW_PASSWORD_SUCCEED };
}

export function attemptSetNewPasswordFailed(data) {
  return { type: actions.ATTEMPT_SET_NEW_PASSWORD_FAILED, payload: { data } };
}

export function attemptSignUp(data) {
  return { type: actions.ATTEMPT_SIGN_UP, payload: { data } };
}

export function attemptSignUpSucceed() {
  return { type: actions.ATTEMPT_SIGN_UP_SUCCEED };
}

export function attemptSignUpFailed(data) {
  return { type: actions.ATTEMPT_SIGN_UP_FAILED, payload: { data } };
}

export function attemptSignUpVerification(data) {
  return { type: actions.ATTEMPT_SIGN_UP_VERIFICATION, payload: { data } };
}

export function attemptSignUpVerificationSucceed() {
  return { type: actions.ATTEMPT_SIGN_UP_VERIFICATION_SUCCEED };
}

export function attemptSignUpVerificationFailed(data) {
  return { type: actions.ATTEMPT_SIGN_UP_VERIFICATION_FAILED, payload: { data } };
}

export function attemptSignOut(data) {
  return { type: actions.ATTEMPT_SIGN_OUT, payload: { data } };
}

export function attemptSignOutSucceed() {
  return { type: actions.ATTEMPT_SIGN_OUT_SUCCEED };
}

export function attemptSignOutFailed(data) {
  return { type: actions.ATTEMPT_SIGN_OUT_FAILED, payload: { data } };
}

export function purgeUser() {
  return { type: actions.PURGE_USER };
}
