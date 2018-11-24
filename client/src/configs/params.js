const params = {
  development: {
    apiUrl: `${process.env.API_URL}`
  },
  production: {
    apiUrl: `${process.env.API_URL}`
  },
  test: {
    apiUrl: "http://localhost:5000"
  }
};

export default params[process.env.NODE_ENV || "development"];
