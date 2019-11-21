const path = require('path');
const nodeExternals = require('webpack-node-externals');

const serverConfig = {
  target: "node",
  devtool: "source-map",
  mode: 'development',
  entry: './src/immutable-lite.js',
  output: {
    filename: 'immutable-lite.node.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  watchOptions: {
    ignored: [
      'node_modules',
      'dist',
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  externals: [nodeExternals()]
};

const clientConfig = {
  target: "web",
  mode: 'development',
  entry: './src/immutable-lite.js',
  output: {
    filename: 'immutable-lite.web.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watchOptions: {
    ignored: [
      'node_modules',
      'dist',
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
};

// module.exports = [ serverConfig, clientConfig ];

module.exports = clientConfig;