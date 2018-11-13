export const PASSWORD_NO_NUMBER = "Password must contain atleast one number.";

export const PASSWORD_MIN_LENGTH = 8;

export const LOGIN_SENT =
  "Email was successfully sent. Please check your inbox for the link.";

export const DEFAULT_OFFSET_VALUE = 0;

export const DEFAULT_LIMIT_VALUE = 50;

export const ACCESS_LINK_SENT_MSG =
  "Access Link has been sent on your email address.";

export const EMAIL_VALIDATED = "Email validated successfully.";

export const TOKEN_VALIDATED = "Token validated successfully.";

export const TOKEN_NOT_FOUND = "No access token found in local storage.";

export const ACTIVE = "active";

export const DELETED = "deleted";

export const SUCCESS = "success";

export const INACTIVE = "inactive";

export const ID_TOKEN = "token";

export const USER_ID = "user_id";

export const APP_MAIN_ROUTE = "/home";

export const LOGIN_ROUTE = "/login";

export const CUSTOMER_INDEX_ROUTE = "/customers";

export const FORBIDDEN = 403;

export const NOT_FOUND = 404;

export const UNAUTHORIZED = 401;

export const VALIDATION_ERROR = 422;

export const REQUIRED = resource => `${resource} is required!`;

export const NUMBER_LETTER = resource =>
  `${resource} requires at least one number and letter!`;

export const MATCHING_WITH_PASSWORD = resource =>
  `${resource} differs from password!`;

export const PASSWORD_CHANGED_SUCCESS =
  "Your password was changed successfully";

export const PENDING = "PENDING";

export const PASSED = "PASSED";

export const FAILED = "FAILED";

export const INVALID_EMAIL = resource => `${resource} is invalid!`;

export const INVALID_EMAIL_MSG = "Email is invalid!";

export const INVALID_PHONE_MSG =
  "Phone number must start with a plus (+) sign, followed immediately by the country code. A phone number can only contain the + sign and digits. For example: +14325551212.";

export const INVALID_URL = resource => `${resource} is invalid URL!`;

export const INVALID_DATE = resource => `${resource} is invalid`;

export const INVALID_NUMBER = resource => `${resource} is invalid`;

export const IS_ALPHANUMERIC = resource =>
  `${resource} should contain only letters and numbers!`;

export const IDENTITY_POOL_ID =
  "eu-west-1:6c6559e0-2b9b-4bd1-8e75-a4c0e242f89a";

export const REGION = "eu-west-1";

export const USER_POOL_ID = "eu-west-1_04m2W9BqU";

export const USER_POOL_WEB_CLIENT_ID = "3tglcv1hjb5nqq53n37r6cpaki";

export const ACCESS_KEY_ID = "AKIAIKQH3AJFUJ4MFHUA";

export const SECRET_ACCESS_KEY = "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";

export const LENGTH_REQUIRED = (resource, options) => {
  const { min, max } = options;
  if (min && max) {
    return `${resource} must be at least ${min} and maximum ${max} characters!`;
  } else if (min) {
    return `${resource} must be at least ${min} characters!`;
  }
  return `${resource} must be maximum ${max} characters!`;
};
