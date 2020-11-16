package com.example.beaconscanner;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import org.w3c.dom.Text;

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

        BLE_Device device = devices.get(position);
        String name = device.getName();
        String address = device.getAddress();
        int rssi = device.getRSSI();
        double distance = device.getDistance();

        TextView tv_name = (TextView) convertView.findViewById(R.id.tv_name);
        if (name != null && name.length() > 0) {
            tv_name.setText(device.getName());
        }
        else {
            tv_name.setText("No Name");
        }

        TextView tv_rssi = (TextView) convertView.findViewById(R.id.tv_rssi);
        tv_rssi.setText("RSSI: " + Integer.toString(rssi));

        TextView tv_macaddr = (TextView) convertView.findViewById(R.id.tv_macaddr);
        if (address != null && address.length() > 0) {
            tv_macaddr.setText(device.getAddress());
        }
        else {
            tv_macaddr.setText("No Address");
        }

        TextView tv_distance = (TextView) convertView.findViewById(R.id.tv_distance);
        tv_distance.setText("Distance: " + Double.toString(distance) + " m");

        return  convertView;
    }
}
