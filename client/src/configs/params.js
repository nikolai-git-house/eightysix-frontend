const params = {
  development: {
    apiUrl: `${process.env.API_URL}/api`,
  },
  production: {
    apiUrl: `${process.env.API_URL}/api`,
  },
  test: {
    apiUrl: 'http://localhost:5000/api',
  },
};

export default params[process.env.NODE_ENV || 'development'];
