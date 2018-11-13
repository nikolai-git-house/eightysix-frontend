import {
  IDENTITY_POOL_ID,
  REGION,
  USER_POOL_ID,
  USER_POOL_WEB_CLIENT_ID,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY
} from "configs/constants";

module.exports = {
  cognito: {
    identityPoolId: IDENTITY_POOL_ID,
    region: REGION,
    userPoolId: USER_POOL_ID,
    userPoolWebClientId: USER_POOL_WEB_CLIENT_ID
  },
  aws: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
  }
};
