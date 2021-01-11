package com.example.demo.persistence;

import com.example.demo.models.UserData;

import java.sql.*;
import java.util.*;

public class UserDataData {
    static Connection connection = null;
    static String url = "jdbc:mysql://mysql-16806-0.cloudclusters.net:16806/GuidanceDB";

    //Open and return a database connection to use
    public static Connection OpenConnection() throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Properties p = new Properties();
        p.put("user", "GuidanceMember");
        p.put("password", "Guidance1234");
        connection = DriverManager.getConnection(url, p);
        return connection;
    }

    public ArrayList<UserData> GetAllUserData() {
        ArrayList<UserData> userDataList = new ArrayList<>();

        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM GuidanceDB.userdata");

            while(rs.next()) {
                UserData userData = new UserData();
                userData.setDistance1(rs.getDouble("distance1"));
                userData.setDistance2(rs.getDouble("distance2"));
                userData.setDistance3(rs.getDouble("distance3"));
                userData.setBeacon1(rs.getString("beacon1"));
                userData.setBeacon2(rs.getString("beacon2"));
                userData.setBeacon3(rs.getString("beacon3"));
                userData.setEmail(rs.getString("email"));
                userData.setLocation(rs.getString("location"));
                userData.setNodeId(rs.getInt("nodeId"));
                userData.setFloorplanId(rs.getString("floorplanId"));
                userData.setSSID(rs.getString("ssid"));
                userDataList.add(userData);
            }

            rs.close();
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException | NullPointerException e) {
            System.out.println(e);
        }

        return userDataList;
    }

    public void CreateUserData(UserData userData) {
        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            int status = stmt.executeUpdate("INSERT INTO `GuidanceDB`.`userdata` (`email`,`distance1`,`distance2`, `distance3`, `beacon1`,`beacon2`,`beacon3`, `location`) VALUES ('"+ userData.getEmail()  +"', '"+ userData.getDistance1() +"', '"+ userData.getDistance2() + "', '"+ userData.getDistance3() + "' , '"+ userData.getBeacon1() + "' , '"+ userData.getBeacon2() + "' , '"+ userData.getBeacon3() + "' , '"+ userData.getLocation() + "');");

            System.out.println("DB update status: " + status);
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }

    public void UpdateUserData(UserData userData, String givenEmail) {
        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            int status = stmt.executeUpdate("UPDATE GuidanceDB.userdata SET email = '"+userData.getEmail()+"', distance1 = '"+ userData.getDistance1() +"', distance2 = '"+ userData.getDistance2() +"', distance3 = '"+ userData.getDistance3() +"', beacon1 = '"+ userData.getBeacon1() +"', beacon2 = '"+ userData.getBeacon2() +"', beacon3 = '"+ userData.getBeacon2() +"', location = '"+ userData.getLocation() +"' WHERE email = '"+ givenEmail +"');");
            System.out.println("DB update status: " + status);
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }

    public void DeleteUserData(String givenEmail) {
        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            String status = "";
            status += String.valueOf(stmt.executeUpdate("SET SQL_SAFE_UPDATES = 0;"));
            status += String.valueOf(stmt.executeUpdate("DELETE FROM `GuidanceDB`.`userData` WHERE email='"+ givenEmail +"';"));
            status += String.valueOf(stmt.executeUpdate("SET SQL_SAFE_UPDATES = 1;"));
            System.out.println("DB update status: " + status);
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }

    public void UpdateClosestNode(int nodeId, String floorplanId, String ssid, String email) {
        try {
            System.out.println("UpdateClosestNode");
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            String status = "";
            status += String.valueOf(stmt.executeUpdate("UPDATE `userdata` SET `nodeId`='"+nodeId+"',`floorplanId`='"+floorplanId+"',`ssid`='"+ssid+"' WHERE email='"+email+"'"));
            System.out.println("DB update status: " + status);
            if(status.equals("1")) {
                UpdateNodeCount(nodeId, floorplanId, ssid, true);
            }
            stmt.close();
            connection.close();
            System.out.println("UpdateClosestNode - END");
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }

    public void RemoveOldClosestNode(String email) {
        try {
            System.out.println("RemoveOldClosestNode");
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT `nodeId`, `floorplanId`, `ssid` FROM `userdata` WHERE email='"+email+"'");

            int nodeId = 0;
            String floorplanId = "";
            String ssid = "";

            while(rs.next()) {
                nodeId = rs.getInt("nodeId");
                floorplanId = rs.getString("floorplanId");
                ssid = rs.getString("ssid");
            }

            if(nodeId != 0 && !floorplanId.equals("") && !ssid.equals("")) {
                UpdateNodeCount(nodeId, floorplanId, ssid, false);
            }
            else {
                System.out.println("DB update status: " + 0);
            }


            rs.close();
            stmt.close();
            connection.close();
            System.out.println("RemoveOldClosestNode - END");
        }
        catch (SQLException | ClassNotFoundException | NullPointerException e) {
            System.out.println(e);
        }
    }

    public void UpdateNodeCount(int nodeId, String floorplanId, String ssid, boolean plus) {
        try {
            System.out.println("UpdateNodeCount");
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT `user_count` FROM `nodes` WHERE id='"+nodeId+"' AND floorplanID='"+floorplanId+"' AND ssid='"+ssid+"'");

            int count = 0;

            while(rs.next()) {
                count = rs.getInt("user_count");
            }

            System.out.println("count: " + count);

            rs.close();
            stmt.close();
            connection.close();

            if(plus) {
                count += 1;
            }
            else if(count > 0) count -= 1;

            System.out.println("count: " + count);

            connection = OpenConnection();
            stmt = connection.createStatement();


            int status = stmt.executeUpdate("UPDATE `nodes` SET `user_count`= '"+count+"' WHERE id='"+nodeId+"' AND floorplanID='"+floorplanId+"' AND ssid='"+ssid+"'");

            System.out.println("DB update status: " + status);

            stmt.close();
            connection.close();
            System.out.println("UpdateNodeCount - END");
        }
        catch(SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }
}
