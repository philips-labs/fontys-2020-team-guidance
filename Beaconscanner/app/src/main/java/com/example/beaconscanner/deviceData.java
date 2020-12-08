package com.example.beaconscanner;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.MessageFormat;

public class deviceData {
    private static Connection conn;

    //possible return values(LEGEND):
    //1 ---> success
    //-1 --> failure
    //-2 --> failure in establishing a connection
    //-3 --> other SQL exception/failure

    public static Integer CreateDevice(Integer userID, String deviceName,
                                String internalIP, String macAddr){
        String query = MessageFormat.format("INSERT INTO device " +
                "(userID, name, ipAddr, macAddr) " +
                "VALUES ({0},'{1}','{2}','{3}')", userID, deviceName, internalIP, macAddr);

        try {
            if ((conn = dbConn.EstablishConnection()) == null) return -2;
            Statement stmt = conn.createStatement();
            Integer response = stmt.executeUpdate(query);
            return response;

        } catch (SQLException e) {
            e.printStackTrace();
            return -3;
        }
    }
    public static Integer UpdateDeviceStats(Integer[][] beacons, Integer deviceID){
        String query = MessageFormat.format("UPDATE deviceRawLocStats SET" +
                " beac1ID = {0}, beac1RSSI = '{1}'" +
                " beac2ID = {2}, beac2RSSI = '{2}'" +
                " beac3ID = {4}, beac3RSSI = '{5}'" +
                " WHERE deviceID = {6}",
                 beacons[0][0], beacons[0][1],
                 beacons[1][0], beacons[1][1],
                 beacons[2][0], beacons[2][1],
                 deviceID);
        try {
            if ((conn = dbConn.EstablishConnection()) == null) return -2;
            Statement stmt = conn.createStatement();
            Integer response = stmt.executeUpdate(query);
            return response;

        } catch (SQLException e) {
            e.printStackTrace();
            return -3;
        }
    }
    public static Integer UpdateBeaconsRSSI(Integer[] beacs){
        String query = MessageFormat.format("UPDATE beaconsSimple SET" +
                "RSSI1 = {0}, RSSI2 = {1}, RSSI3 = {2}", beacs[0], beacs[1], beacs[2]);
        try {
            if ((conn = dbConn.EstablishConnection()) == null) return -2;
            Statement stmt = conn.createStatement();
            Integer response = stmt.executeUpdate(query);
            return response;
        } catch (SQLException e){
            e.printStackTrace();
            return -3;
        }
    }
    public static Integer getNodeIDByName(String name){
        String query = "SELECT id FROM nodeInitial WHERE name =" + name;

        try {
            if ((conn = dbConn.EstablishConnection()) == null) return -2;
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            Integer id = 0;
            while(rs.next()){
                id = rs.getInt("id");
            }
            return id;
        } catch (SQLException e){
            e.printStackTrace();
            return -3;
        }
    }
    public static Integer createANode(String name){
        String query = "INSERT INTO nodeInitial (name) VALUES ('" + name + "')";
        try {
            if ((conn = dbConn.EstablishConnection()) == null) return -2;
            Statement stmt = conn.createStatement();
            Integer response = stmt.executeUpdate(query);
            return response;
        } catch (SQLException e) {
            e.printStackTrace();
            return -3;
        }
    }
}
