package com.example.demo.persistence;

import com.example.demo.models.UserData;
import org.springframework.security.core.parameters.P;

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
            System.out.println("getall: " + e);
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

    public void UpdateNodeConnection(int nodeId, String email, String floorplanID, String SSID) {
        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            int nodeID = 0;
            String floorplanId = "";
            String ssid = "";

            ResultSet rs = stmt.executeQuery("SELECT `nodeId`, `floorplanId`, `ssid` FROM `userdata` WHERE email='"+email+"'");

            while(rs.next()) {
                nodeID = rs.getInt("nodeId");
                floorplanId = rs.getString("floorplanId");
                ssid = rs.getString("ssid");
            }

            if(nodeId != 0 && !floorplanId.equals("") && !ssid.equals("")) {
                int count = NodeConnectionCount(nodeID, floorplanId, ssid);
                SetNodeCount(count, nodeID, floorplanId, ssid, false);
                System.out.println(nodeID);
                System.out.println(floorplanId);
                System.out.println(ssid);

                count = NodeConnectionCount(nodeId, floorplanID, SSID);
                SetNodeCount(count, nodeId, floorplanId, ssid, true);

                //SetPastNodeConnection(email, nodeId, floorplanID, SSID);
                System.out.println(nodeId);
                System.out.println(floorplanId);
                System.out.println(ssid);
            }
            else {
                System.out.println("Some of the data was null!");
            }

            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }

    public int NodeConnectionCount(int nodeId, String floorplanId, String ssid) {
        int count = 0;

        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            ResultSet rs = stmt.executeQuery("SELECT `user_count` FROM `nodes` WHERE id='"+nodeId+"' AND floorplanID='"+floorplanId+"' AND ssid='"+ssid+"'");

            while(rs.next()) {
                count = rs.getInt("user_count");
            }

            stmt.close();
            connection.close();

            return count;
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }

        return count;
    }

    public void SetNodeCount(int count, int nodeId, String floorplanId, String ssid, boolean add) {
        try {
            if(add) {
                count++;
            }
            else if(count > 0) {
                count--;
            }

            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            int status = stmt.executeUpdate("UPDATE `nodes` SET `user_count`= '"+count+"' WHERE id='"+nodeId+"' AND floorplanID='"+floorplanId+"' AND ssid='"+ssid+"'");

            stmt.close();
            connection.close();
        }
        catch(SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }

    public void SetPastNodeConnection(String email, int nodeId, String floorplanId, String ssid) {
        System.out.println("updated old connection");
        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            int status = stmt.executeUpdate("UPDATE `userdata` SET `nodeId`='"+nodeId+"',`floorplanId`='"+floorplanId+"',`ssid`='"+ssid+"' WHERE email='"+email+"'");

            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }
}
