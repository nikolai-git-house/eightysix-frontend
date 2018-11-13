const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

/*
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV || 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;
const METADATA = {
  title: 'EightySix',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer(),
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: false
};

module.exports = () => {
  return webpackMerge(commonConfig({ env: ENV }), {

    entry: helpers.root('client/src'),

    output: {
      path: helpers.root('client/production'),
      filename: 'js/bundle-[chunkhash].js'
    },
    module: {
      rules: [
        {
          test: /.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
          use: ['url-loader']
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!sass-loader'
          })
        }
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: helpers.root('client/public/index.html'),
        title: METADATA.title,
        chunksSortMode: 'dependency',
        metadata: METADATA,
        ssrContent: '<%- ssrContent %>',
        filename: 'index.ejs',
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
      }),

      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR,
        }
      }),

      new UglifyJsPlugin({
        compress: {
          warnings: false
        },
        mangle: true,
        sourcemap: true,
        beautify: false,
        dead_code: true
      }),

      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|html)$/,
        threshold: 10240,
        minRatio: 0.8
      }),

      new CleanWebpackPlugin([
        helpers.root('client/production')
      ], {}),
      new ExtractTextPlugin({
        filename: 'css/style-[chunkhash].css',
        allChunks: false
      }),
      new CopyWebpackPlugin([
        { from: helpers.root('client/public/img'), to: 'img' },
        { from: helpers.root('client/public/fonts'), to: 'fonts' },
      ], { debug: 'debug' })
    ]
  });
};
