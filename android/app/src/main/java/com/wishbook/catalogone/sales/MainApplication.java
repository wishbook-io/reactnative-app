package com.wishbook.catalogone.sales;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;

import com.facebook.react.ReactApplication;
import com.freshchat.consumer.sdk.react.RNFreshchatSdkPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnative.photoview.PhotoViewPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.horcrux.svg.SvgPackage;
import com.wishbook.catalogone.nativepackages.deviceid.DeviceIdPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage; 
import com.RNFetchBlob.RNFetchBlobPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;
import com.burnweb.rnsendintent.RNSendIntentPackage;
import io.realm.react.RealmReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFreshchatSdkPackage(),
            new RNGestureHandlerPackage(),
            new RNCWebViewPackage(),
            new PhotoViewPackage(),
            new RNGoogleSigninPackage(),
            new PickerPackage(),
            new VectorIconsPackage(),
            new RNSharePackage(),
            new RNSendIntentPackage(),
            new LinearGradientPackage(),
            new ImagePickerPackage(),
            new RNFirebasePackage(),
            new FastImageViewPackage(),
            new ReactNativeContacts(),
            new SvgPackage(),
            new DeviceIdPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFetchBlobPackage(),
            new RealmReactPackage(),
            new RNFirebaseNotificationsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  @Override
  protected void attachBaseContext(Context base) {
     super.attachBaseContext(base);
     MultiDex.install(this);
  }

  @Override
  public String getFileProviderAuthority() {
    return BuildConfig.APPLICATION_ID + ".provider";
  }

}
