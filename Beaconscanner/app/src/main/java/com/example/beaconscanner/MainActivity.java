package com.example.beaconscanner;

import androidx.appcompat.app.AppCompatActivity;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;
import android.widget.ScrollView;

import java.util.ArrayList;
import java.util.HashMap;

public class MainActivity extends AppCompatActivity implements View.OnClickListener, AdapterView.OnItemClickListener {
    private final static String TAG = MainActivity.class.getSimpleName();

    public static final int REQUEST_ENABLE_BT = 1;
    private static final int PERMISSION_REQUEST_COARSE_LOCATION = 456;

    private HashMap<String, BLE_Device> mBTDeviceHashMap;
    private ArrayList<BLE_Device> mBTDeviceArrayList;
    private ListAdapter_BLE_Devices adapter;

    private Button btn_Scan;

    private BroadcastReceiver_BTState mBTStateUpdateReceiver;
    private Scanner_BLE mBLEScanner;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //Check om te controleren of BLE is supported op het apparaat.
        if (!getPackageManager().hasSystemFeature(PackageManager.FEATURE_BLUETOOTH_LE)) {
            Utils.toast(getApplicationContext(), "BLE not supported");
            finish();
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            requestPermissions(new String[]{Manifest.permission.ACCESS_COARSE_LOCATION}, PERMISSION_REQUEST_COARSE_LOCATION);
        }

        mBTStateUpdateReceiver = new BroadcastReceiver_BTState(getApplicationContext());
        mBLEScanner = new Scanner_BLE(this, 15000, -75);

        mBTDeviceHashMap = new HashMap<>();
        mBTDeviceArrayList = new ArrayList<>();

        adapter = new ListAdapter_BLE_Devices(this, R.layout.device_list_item, mBTDeviceArrayList);

        ListView listView = new ListView(this);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(this);
        ((ScrollView) findViewById(R.id.scrollView)).addView(listView);

        btn_Scan = (Button) findViewById(R.id.btn_scan);
        findViewById(R.id.btn_scan).setOnClickListener(this);
    }

    @Override
    protected void onStart() {
        super.onStart();

        registerReceiver(mBTStateUpdateReceiver, new IntentFilter(BluetoothAdapter.ACTION_STATE_CHANGED));
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        stopScan();
    }

    @Override
    protected void onStop() {
        super.onStop();

        unregisterReceiver(mBTStateUpdateReceiver);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        // Controleren of we op de goeie request reageren
        if (requestCode == REQUEST_ENABLE_BT) {
            // Zeker weten dat de aanvraag succesvol was
            if (resultCode == RESULT_OK) {
                // Utils.toast(getApplicationContext(), "Thank you for turning on Bluetooth");
            } else if (resultCode == RESULT_CANCELED) {
                Utils.toast(getApplicationContext(), "Please turn on Bluetooth");
            }
        }
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        // Voor later
    }

    @Override
    public void onClick(View v) {

        switch (v.getId()) {

            case R.id.btn_scan:
                Utils.toast(getApplicationContext(), "Scan Button Pressed");

                if (!mBLEScanner.isScanning()) {
                    startScan();
                }
                else {
                    stopScan();
                }
                break;
            default:
                break;
        }
    }

    public void addDevice(BluetoothDevice device, int new_rssi) {
        String address = device.getAddress();

        if (!mBTDeviceHashMap.containsKey(address)) {
            BLE_Device ble_device = new BLE_Device(device);
            ble_device.setRSSI(new_rssi);

            mBTDeviceHashMap.put(address, ble_device);
            mBTDeviceArrayList.add(ble_device);
        }
        else {
            mBTDeviceHashMap.get(address).setRSSI(new_rssi);
        }

        adapter.notifyDataSetChanged();
    }

    public void startScan() {
        btn_Scan.setText("Scanning...");

        mBTDeviceArrayList.clear();
        mBTDeviceHashMap.clear();

        adapter.notifyDataSetChanged();

        mBLEScanner.start();
    }

    public void stopScan() {
        btn_Scan.setText("Scan Again");

        mBLEScanner.stop();
    }
}