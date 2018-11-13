switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./build/webpack.prod')({ env: 'production' }); // eslint-disable-line global-require
    break;
  case 'test':
  case 'jest':
    module.exports = require('./build/webpack.dev')({ env: 'test' }); // eslint-disable-line global-require
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./build/webpack.dev')({ env: 'development' }); // eslint-disable-line global-require
}
