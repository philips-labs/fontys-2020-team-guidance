package com.beaconapp;

import android.bluetooth.BluetoothDevice;

public class BLE_Device {

    private BluetoothDevice bluetoothDevice;
    private int rssi;
    private double distance;

    public BLE_Device(BluetoothDevice bluetoothDevice) {
        this.bluetoothDevice = bluetoothDevice;
    }

    public String getAddress() {
        return bluetoothDevice.getAddress();
    }

    public String getName() {
        return bluetoothDevice.getName();
    }

    public void setRSSI(int rssi) {
        this.rssi = rssi;
    }

    public int getRSSI() {
        return rssi;
    }

    public double getDistance() {
        //Distance = 10 ^ ((Measured Power — RSSI)/(10 * N))
        //N stands for Strength, 2, 3 or 4 from low to strong, like obstacles or not
        distance = Math.pow(10, ( (double) (-58 - rssi)/(10 * 2)));
        return Math.round(distance * 100.0) / 100.0;
    }
}
