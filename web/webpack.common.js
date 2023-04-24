const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../');

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'app'),
    // path.resolve(appDirectory, 'node_modules/')
    path.resolve(appDirectory, 'node_modules/@react-navigation/'),
    path.resolve(appDirectory, 'node_modules/native-base/'),
    path.resolve(appDirectory, 'node_modules/native-base-shoutem-theme/'),
    path.resolve(appDirectory, 'node_modules/react-native-collapsible/'),
    path.resolve(appDirectory, 'node_modules/react-native-confirmation-code-field/'),
    path.resolve(appDirectory, 'node_modules/react-native-dialog/'),
    path.resolve(appDirectory, 'node_modules/react-native-drawer/'),
    path.resolve(appDirectory, 'node_modules/react-native-easy-grid/'),
    path.resolve(appDirectory, 'node_modules/react-native-easy-toast/'),
    path.resolve(appDirectory, 'node_modules/react-native-floating-labels/'),
    path.resolve(appDirectory, 'node_modules/react-native-keyboard-aware-scroll-view/'),
    path.resolve(appDirectory, 'node_modules/react-native-material-buttons/'),
    path.resolve(appDirectory, 'node_modules/react-native-material-menu/'),
    path.resolve(appDirectory, 'node_modules/react-native-material-ripple/'),
    path.resolve(appDirectory, 'node_modules/react-native-materialui-textfield/'),
    path.resolve(appDirectory, 'node_modules/react-native-modal-datetime-picker/'),
    path.resolve(appDirectory, 'node_modules/react-native-paper/'),
    path.resolve(appDirectory, 'node_modules/react-native-swiper/'),
    path.resolve(appDirectory, 'node_modules/react-native-vector-icons/'),
    path.resolve(appDirectory, 'node_modules/react-native-web/'),
    path.resolve(appDirectory, 'node_modules/react-navigation-drawer/'),
    path.resolve(appDirectory, 'node_modules/react-navigation-stack/'),
    path.resolve(appDirectory, 'node_modules/react-navigation-tabs/'),
    path.resolve(appDirectory, 'node_modules/react-native-gesture-handler/'),
    path.resolve(appDirectory, 'node_modules/react-native-tab-view/'),
    path.resolve(appDirectory, 'node_modules/react-native-image-picker/'),
    path.resolve(appDirectory, 'node_modules/react-native-date-ranges/'),
    path.resolve(appDirectory, 'node_modules/rn-fetch-blob'),
    path.resolve(appDirectory, 'node_modules/react-native-share'),
    path.resolve(appDirectory, 'node_modules/react-navigation-backhandler'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'react-native' preset is recommended to match React Native's packager
      presets: ['module:metro-react-native-babel-preset'],
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web']
    }
  }
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: './assets/images/[name].[ext]',
      limit: 8192,
    }
  }
};

const fontLoaderConfiguration = {
  test: /\.ttf$/,
  use: {
    loader: "url-loader", // or directly file-loader
    options: {
      name: './assets/fonts/[hash].[ext]',
      limit: 8192,
    },
  },
  include: path.resolve(appDirectory, "node_modules/react-native-vector-icons"),
}

module.exports = {
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    require.resolve('regenerator-runtime/runtime'), 
    path.resolve(appDirectory, 'index.web.js')
  ],

  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist')
  },

  // ...the rest of your config

  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      fontLoaderConfiguration
    ]
  },

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',
      'react-native/Libraries': 'react-native-web/src',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
      'react-native-fast-image': 'react-native-web/src/exports/Image',
      'react-native-photo-view': 'react-native-web/src/exports/Image',
      'react-native-modal': 'modal-enhanced-react-native-web',
      'react-native-swiper': 'react-native-web-swiper',
      // 'react-native/Libraries/vendor': 'react-native-web/src/vendor/react-native',
      'app': path.resolve(appDirectory, 'app'),
      'react-navigation-backhandler': path.resolve(appDirectory, 'app/utils/WebBackHandler')
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [ '.web.js', '.js' ]
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production'
    }),
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    new htmlWebpackPlugin({
      template: 'web/index.html',
      inject: 'body',
    }),
  ],

}