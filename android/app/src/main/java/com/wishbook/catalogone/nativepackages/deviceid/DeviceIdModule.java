package com.wishbook.catalogone.nativepackages.deviceid;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import android.provider.Settings.Secure;
import android.app.Activity;
import android.content.Context;
import android.content.ContentResolver;

public class DeviceIdModule extends ReactContextBaseJavaModule {
    public DeviceIdModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DeviceId";
    }

    @ReactMethod
    public void getDeviceId(Promise promise) {
        final Activity activity = getCurrentActivity();
        Context context = activity.getApplicationContext();
        String deviceId = Secure.getString(context.getContentResolver(), Secure.ANDROID_ID);
        promise.resolve(deviceId);
    }
 }