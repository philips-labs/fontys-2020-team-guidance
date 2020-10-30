package com.example.beaconscanner;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;

import java.util.ArrayList;

public class ListAdapter_BLE_Devices extends ArrayAdapter<BLE_Device> {

    Activity activity;
    int layoutRecourseID;
    ArrayList<BLE_Device> devices;

    public ListAdapter_BLE_Devices(Activity activity, int recourse, ArrayList<BLE_Device> objects) {
        super(activity.getApplicationContext(), recourse, objects);

        this.activity = activity;
        layoutRecourseID = recourse;
        devices = objects;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            LayoutInflater inflater =
                    (LayoutInflater) activity.getApplicationContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(layoutRecourseID, parent, false);
        }
        return  convertView;
    }
}
