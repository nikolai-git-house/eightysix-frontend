import "regenerator-runtime/runtime";
import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import getAppConfigurations from "helpers/app/getAppConfigurations";
import "sass/vendor.scss";

// Load the AWS SDK
/*eslint-disable*/
var AWS = require("aws-sdk"),
  endpoint = "https://secretsmanager.eu-west-1.amazonaws.com",
  region = "eu-west-1",
  secretName = "awesomebox",
  secret,
  binarySecretData;

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
  endpoint: endpoint,
  region: region
});

client.getSecretValue({ SecretId: secretName }, function(err, data) {
  if (err) {
    if (err.code === "ResourceNotFoundException")
      console.log("The requested secret " + secretName + " was not found");
    else if (err.code === "InvalidRequestException")
      console.log("The request was invalid due to: " + err.message);
    else if (err.code === "InvalidParameterException")
      console.log("The request had invalid params: " + err.message);
  } else {
    // Decrypted secret using the associated KMS CMK
    // Depending on whether the secret was a string or binary, one of these fields will be populated
    if (data.SecretString !== "") {
      secret = data.SecretString;
      console.log(secret);
    } else {
      binarySecretData = data.SecretBinary;
    }
  }

  // Your code goes here.
});

const App = () => {
  const history = createHistory();
  const { store, routes } = getAppConfigurations(history);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>{routes}</ConnectedRouter>
    </Provider>
  );
};

export default App;
