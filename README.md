# reactnative-app
ReactNative version of the Wishbook mobile app, was to be the single generic app used across platforms. The released iOS app (versio lagging) used this code.

Last worked upon / updated in 2020.

## Hardcoded dependencies to remove / modify (should hae been fewer, apologies!)
- app/utils/const.js - quite a few constants here to be updated.
- app/utils/freshchat/index.web.js - eg freshchat token
  ```export const init = () => {
  window.fcWidget.init({
    token: "4d1f51cc-687c-4e81-9ec9-e3d0105ede1d",
    host: "https://wchat.freshchat.com",
    config: {
      headerProperty: {
        //Set Widget to be left to right.
        direction: 'ltr',
        backgroundColor: colorresource.liteblue,
        appLogo: 'https://seller.wishbook.io/app/img/logo-single.png'
      }
  }
  ```
- app/utils/URLConstants.js
- app/saga/errorhandlerplayground-saga.js
- app/saga/category-saga.js
- app/screens/resell/ResellAddresses.js
- app/screens/cart/debugCatalogWise.json
- app/screens/wbmoney/Incentives.js
- app/firebase/PushNotificationController/index.js
- app/firebase/PushNotificationController/index.js
- app/actions/navigation-actions.js

## Conversion from ReactNative to ReactJS

1. Get the repo
2. `yarn add react react-dom react-native-web react-art`
3. `yarn add --dev babel-loader url-loader webpack webpack-cli webpack-dev-server babel-plugin-react-native-web`
4. `yarn add --dev @babel/core @babel/preset-env` (@babel core is already present, so we could've avoided it)
5. `mkdir web && cd web && code webpack.config.js`
6. Copy config from react-native-web
7. Fix paths, our project is present in app folder instead of src folder
    * Create an `index.web.js` file, copied from 2nd commit
    * Change preset from react-native to `module:metro-react-native-preset`
8. Before running make sure only one screen is loaded - splash screen
    * So comment out everything except splash from routes.js
9. Remove trailing comma from en.json
10. Add `html-webpack-plugin`, configure it in webpack
11. Add new `webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production'
    })`, in plugins
12. `require.resolve('regenerator-runtime/runtime')`

### Splash screen:

* Had to stub out realm
* Fixed centering of image.

### Login screen:

* Had to remove firebase, error: event emitter is not supported on web, might have to use a different library for it
* Action sheet doesn't overlay on the login ui, it is shown at the bottom left
* The numeric text box shows up down buttons
* The loading modal is broken, shown on top left

### Verify OTP screen:

* Code input
    * Up/down buttons
    * 2 digit codes instead of 1
    * Eye icon missing

### Forgot password screen:

* Due to modal, there is a crash here
* Using ErrorBoundary to stop the crash from propagating
* Made a cross platform "app/components/Modal/Modal" implementation

### Language selection:

* Radio icon not showing

### App intro:

* The intro screens are displayed as a list

======= Libs that need fixing =======
```
react-native-fast-image (uses resolveAssetSource, commit 47e36edc24a1990eeb735527ae4ebe6d2dbe61b5#diff-1fdf421c05c1140f6d71444ea2b27638 might fix this)
  ERROR in ./node_modules/react-native/Libraries/Image/resolveAssetSource.js
  Module not found: Error: Can't resolve 'AssetRegistry' in '/home/wishbook/MMR/code/reactwebapp2/reactapp/node_modules/react-native/Libraries/Image'
  @ ./node_modules/react-native/Libraries/Image/resolveAssetSource.js 1:31-55
  @ ./node_modules/react-native-fast-image/index.js
  @ ./app/screens/home/ImageViewCard.js
  @ ./app/screens/home/HomeScreen.js
  @ ./app/config/routes.js
  @ ./app/index.js
  @ ./index.web.js
  @ multi (webpack)-dev-server/client?http://localhost:8080 (webpack)/hot/dev-server.js ./node_modules/regenerator-runtime/runtime.js ./index.web.js

react-native-firebase - event emitter error
  ERROR in ./node_modules/react-native/Libraries/vendor/emitter/EventEmitter.js
  Module not found: Error: Can't resolve 'EmitterSubscription' in '/home/wishbook/MMR/code/reactwebapp2/reactapp/node_modules/react-native/Libraries/vendor/emitter'
  @ ./node_modules/react-native/Libraries/vendor/emitter/EventEmitter.js 1:668-698
  @ ./node_modules/react-native-firebase/dist/utils/events.js
  @ ./node_modules/react-native-firebase/dist/modules/core/app.js
  @ ./node_modules/react-native-firebase/dist/modules/core/firebase.js
  @ ./node_modules/react-native-firebase/dist/index.js
  @ ./app/screens/login/LoginScreen.js
  @ ./app/config/routes.js
  @ ./app/index.js
  @ ./index.web.js
  @ multi (webpack)-dev-server/client?http://localhost:8080 (webpack)/hot/dev-server.js ./node_modules/regenerator-runtime/runtime.js ./index.web.js

  ERROR in ./node_modules/react-native/Libraries/vendor/emitter/EventEmitter.js
  Module not found: Error: Can't resolve 'EventSubscriptionVendor' in '/home/wishbook/MMR/code/reactwebapp2/reactapp/node_modules/react-native/Libraries/vendor/emitter'
  @ ./node_modules/react-native/Libraries/vendor/emitter/EventEmitter.js 1:727-761
  @ ./node_modules/react-native-firebase/dist/utils/events.js
  @ ./node_modules/react-native-firebase/dist/modules/core/app.js
  @ ./node_modules/react-native-firebase/dist/modules/core/firebase.js
  @ ./node_modules/react-native-firebase/dist/index.js
  @ ./app/screens/login/LoginScreen.js
  @ ./app/config/routes.js
  @ ./app/index.js
  @ ./index.web.js
  @ multi (webpack)-dev-server/client?http://localhost:8080 (webpack)/hot/dev-server.js ./node_modules/regenerator-runtime/runtime.js ./index.web.js

react-native-linear-gradient
  ERROR in ./node_modules/react-native-linear-gradient/index.android.js
  Module not found: Error: Can't resolve 'react-native/Libraries/Utilities/deprecatedPropType.js' in '/home/wishbook/MMR/code/reactwebapp2/reactapp/node_modules/react-native-linear-gradient'
  @ ./node_modules/react-native-linear-gradient/index.android.js 1:4598-4663
  @ ./node_modules/react-native-linear-gradient/index.js
  @ ./app/screens/home/HomeScreen.js
  @ ./app/config/routes.js
  @ ./app/index.js
  @ ./index.web.js
  @ multi (webpack)-dev-server/client?http://localhost:8080 (webpack)/hot/dev-server.js ./node_modules/regenerator-runtime/runtime.js ./index.web.js

react-native-confirmation-code-input
  replaced with react-native-confirmation-code-field because it is LTS. It too has an issue where

cdwdir && cd node_modules/@react-navigation/native && npm i --save "git://github.com/kmagiera/react-native-gesture-handler.git#a280850"


======= PRODUCTION =======

diff --git a/web/webpack.config.js b/web/webpack.config.js
index ee9f24f..563da7c 100644
--- a/web/webpack.config.js
+++ b/web/webpack.config.js
@@ -59,7 +59,7 @@ module.exports = {
     require.resolve('regenerator-runtime/runtime'), 
     path.resolve(appDirectory, 'index.web.js')
   ],
-
+  mode: 'production',
   // configures where the build ends up
   output: {
     filename: 'bundle.web.js',
@@ -96,7 +96,7 @@ module.exports = {
 
   plugins: [
     new webpack.DefinePlugin({
-      __DEV__: process.env.NODE_ENV !== 'production'
+      __DEV__: false
     }),
     new htmlWebpackPlugin({
       template: 'web/index.html',
@@ -104,5 +104,5 @@ module.exports = {
     }),
   ],
 
-  devtool: process.env.NODE_ENV !== 'production' ? 'cheap-module-eval-source-map' : 'hidden-source-map'
+  devtool: 'source-map'
 }
\ No newline at end of file
```