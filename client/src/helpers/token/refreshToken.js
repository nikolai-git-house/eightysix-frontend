const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const AWS = require("aws-sdk");

const config = require("../../configs/aws");

const data = {
  UserPoolId: config.cognito.userPoolId,
  ClientId: config.cognito.userPoolWebClientId
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
/*eslint-disable*/
function refreshToken() {
  return new Promise((resolve, reject) => {
    let cognitoUser = userPool.getCurrentUser();
    console.log(cognitorUser);
    if (cognitoUser != null) {
      console.log("here is cognitorUser isn't null");
      cognitoUser.getSession(function(err, session) {
        refresh_token = session.getRefreshToken();
        if (AWS.config.credentials.needsRefresh()) {
          cognitoUser.refreshSession(refresh_token, (err, session) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              AWS.config.credentials.params.Logins[
                "cognito-idp.<eu-west-1>.amazonaws.com/<eu-west-1_04m2W9BqU>"
              ] = session.getIdToken().getJwtToken();
              AWS.config.credentials.refresh(err => {
                if (err) {
                  console.log(err);
                  reject(err);
                } else {
                  console.log("TOKEN SUCCESSFULLY UPDATED");
                }
              });
            }
          });
        } else {
          console.log("no need refresh");
        }
      });
    }
    resolve();
  });
}
export default refreshToken;
