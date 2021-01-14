package com.beaconapp;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;

import junit.framework.TestCase;

import org.junit.Test;

import java.util.Set;

public class BLE_DeviceTest extends TestCase {

    @Test
    public void testGetDistance() {
        Integer rssi = -24;
        BLE_Device testDevice = new BLE_Device();
        testDevice.setRSSI(rssi);
        Double result = testDevice.getDistance();

        //calculated for RSSI "-24", result should be "0.14"
        assertEquals(0.14, result);
    }
}