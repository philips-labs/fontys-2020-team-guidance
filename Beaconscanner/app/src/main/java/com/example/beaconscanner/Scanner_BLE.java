package com.example.beaconscanner;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.content.Context;
import android.os.Handler;
import android.util.Log;


public class Scanner_BLE {

    private MainActivity ma;

    private BluetoothAdapter mBluetoothAdapter;
    private boolean mScanning;
    private Handler mHandler;

    private long scanPeriod;
    private int signalStrength;

    public Scanner_BLE(MainActivity mainActivity, long scanPeriod, int signalStrength) {
        ma = mainActivity;

        mHandler = new Handler();

        this.scanPeriod = scanPeriod;
        this.signalStrength = signalStrength;

        final BluetoothManager bluetoothManager =
                (BluetoothManager) ma.getSystemService(Context.BLUETOOTH_SERVICE);

        mBluetoothAdapter = bluetoothManager.getAdapter();
    }

    public boolean isScanning() {
        return mScanning;
    }

    public void start() {
        if (!Utils.checkBluetooth(mBluetoothAdapter)) {
            Utils.requestUseBluetooth(ma);
            ma.stopScan();
        } else {
            scanLeDevice(true);
        }
    }

    public void stop() {
        scanLeDevice(false);
    }

    private void scanLeDevice(final boolean enable) {
        if (enable && !mScanning) {
            Utils.toast(ma.getApplication(), "Starting BLE Scan...");

            mHandler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    Utils.toast(ma.getApplicationContext(), "Stopping BLE Scan...");

                    mScanning = false;
                    mBluetoothAdapter.stopLeScan(mLeScanCallback);

                    ma.stopScan();
                    Log.d("SCAN", "Scan is started");
                }
            }, scanPeriod);

            mScanning = true;
            mBluetoothAdapter.startLeScan(mLeScanCallback);
            Log.d("SCAN", "Scan is started");
        }
    }

    private BluetoothAdapter.LeScanCallback mLeScanCallback =
            new BluetoothAdapter.LeScanCallback() {
                @Override
                public void onLeScan(final BluetoothDevice device, int rssi, byte[] scanRecord) {
                    //Log.d("SCAN", "IDK hij komt in die onLeScan");
                    final int new_rssi = rssi;
                    if (rssi > signalStrength) {
                        mHandler.post(new Runnable() {
                            @Override
                            public void run() {
                                if (device.getName() != null) { // iBKS Plus 1 Guidance <- Name with 1,2 or 3
                                    if (device.getName().contains("iBKS Plus") == true & device.getName().contains("Guidance") == true) {
                                        ma.addDevice(device, new_rssi);
                                    }
                                }
                            }
                        });
                    }
                }
            };
}
