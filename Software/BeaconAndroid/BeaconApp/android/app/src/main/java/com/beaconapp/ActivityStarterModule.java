package com.beaconapp;

import android.content.Intent;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ActivityStarterModule extends ReactContextBaseJavaModule {

    ActivityStarterModule(ReactApplicationContext reactContext) {
        super(reactContext);

    }

    @Override
    public String getName(){
        return "ActivityStarter";
    }

    @ReactMethod
    void navigateToExample() {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, ScanActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }
}
