package com.beaconapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;



public class LoadScannerModule extends ReactContextBaseJavaModule {

    private boolean isLoggedIn = false;

    public LoadScannerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public LoadScannerModule() {

    }

    @Override
    public String getName() {
        return "LoadScannerModule";
    }


    @ReactMethod
    public void setScanScreen() {

    }


    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }

}


