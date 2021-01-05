package com.beaconapp;

import android.content.Context;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.webkit.WebSettings;

import androidx.annotation.Nullable;

import java.io.*;
import java.lang.reflect.Array;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;

public class CallAPI extends AsyncTask<String, Void, Void> {

    String data;
    Handler dbHandler;
    int handlerDelay;
    ArrayList<BLE_Device> temp;
    String email; //HARDCODED until handled by login form
    String location;
    Context activityContext;

    //class to handle beacon stats update to DB every 3 seconds using ASYNC task
    public CallAPI(Context activityContext){
        this.activityContext = activityContext;
        dbHandler = new Handler();
        handlerDelay = 3000;
        temp = new ArrayList<BLE_Device>();
        email = "artsdylan@gmail.com";
        location = "location";
    }

    //Initiates the 3 second callback function + updates the BLE_DEVICE local list
    public void feedAPI(){
        this.execute();
    }

    public void updateDevices(ArrayList<BLE_Device> arFilteredBLE) {
        temp = arFilteredBLE;
    }

    //Terminates the ASYNC task
    public void stopAPI(){
        super.cancel(true);
    }

    @Override
    protected Void doInBackground(String... params) {
        dbHandler.postDelayed(new Runnable() {
            public void run() {
                //checks to see if there are exactly 3 devices in the list
                //Utils.toast(activityContext, temp.toString());
                if (temp.size() == 3){
                    String urlString = "http://192.168.178.10:8085/api/beacon/broadcast";

                    //Utils.toast(activityContext, data);
                    try {
                        URL url = new URL(urlString);
                        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                        urlConnection.setRequestMethod("POST");
                        urlConnection.setRequestProperty("Content-Type", "application/json; utf-8");
                        urlConnection.setRequestProperty("Accept", "application/json");
                        urlConnection.setDoOutput(true);

                        String jsonInputString = "{\"email\": \"artsdylan@gmail.com\", \"distance1\": \"" + temp.get(0).getDistance() + "\", \"distance2\": \"" + temp.get(1).getDistance() + "\", \"distance3\": \"" + temp.get(2).getDistance() + "\", \"location\": \"location\", \"beacon1\": \"" + temp.get(0).getName() + "\",\"beacon2\": \"" + temp.get(1).getName() + "\",\"beacon3\": \"" + temp.get(2).getName() + "\"}";

                        try (OutputStream os = urlConnection.getOutputStream()) {
                            byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
                            os.write(input, 0, input.length);
                        }
                        catch (Exception e) {
                            //Utils.toast(activityContext, String.valueOf(urlConnection.getContentLength()));
                        }
                        System.out.println("Data sent with response code: "+ urlConnection.getResponseCode());
                        //Utils.toast(activityContext, "Data sent with response code: "+ urlConnection.getResponseCode());
                    }
                    catch (Exception e) {
                        //Utils.toast(activityContext, e.toString());
                        System.out.println(e.getMessage());
                    }
                }
                else {
                    System.out.println("not enough parameters");
                }
                dbHandler.postDelayed(this, 3000);
            }}, handlerDelay);
        return null;
    }
}
