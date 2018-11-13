const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * Webpack Constants
 */
const METADATA = {
  title: 'EightySix',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

module.exports = () => {

  return {
    resolve: {
      alias: {
        components: helpers.root('client/src/components'),
        helpers: helpers.root('client/src/helpers'),
        configs: helpers.root('client/src/configs'),
        sass: helpers.root('client/assets/sass'),
        fonts: helpers.root('client/public/fonts'),
        img: helpers.root('client/public/img'),
        test: helpers.root('client/src/__tests__'),
        apps: helpers.root('client/src/app'),
        api: helpers.root('client/src/api')
      },
      extensions: ['.js', '.jsx']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: helpers.root('client/public/index.html'),
        title: METADATA.title,
        chunksSortMode: 'dependency',
        metadata: METADATA
      }),
      new Dotenv({
        path: helpers.root('.env'), // Path to .env file (this is the default)
        safe: false, // load .env.example (defaults to "false" which does not use dotenv-safe)
        systemvars: true,
        silent: true
      })
    ]
  };
};
