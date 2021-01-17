package com.beaconapp;

import org.junit.Test;

import java.util.HashMap;
import java.util.Set;

import static org.junit.Assert.*;

public class ScanActivityTest {

    ScanActivity scanActivity = new ScanActivity();
    private HashMap<String, Integer> mockDataForMinKey = new HashMap<String, Integer>(){
        {
            put("Beacon1", 99);
            put("Beacon2", 59);
            put("Beacon3", 15);
            put("Beacon4", 96);
            put("Beacon5", 24);
            put("Beacon6", 37);
            put("Beacon7", 41);
        }
    };


    @Test
    public void filter3ClosestDevicesTest() {
        //partial!!!!
        //testing only the logic from the method
        Integer[] closest3devicesByRSSI = new Integer[3];
        for (int i = 0; i< closest3devicesByRSSI.length; i++){
            String res = scanActivity.getMinKey(mockDataForMinKey, mockDataForMinKey.keySet());
            closest3devicesByRSSI[i] = mockDataForMinKey.get(res);
            mockDataForMinKey.remove(res);
        }
        assertArrayEquals(new Integer[]{15,24,37}, closest3devicesByRSSI);
    }

    @Test
    public void getMinKeyTest() {
        String result = scanActivity.getMinKey(mockDataForMinKey, mockDataForMinKey.keySet());

        assertEquals("Beacon3", result);
    }
}