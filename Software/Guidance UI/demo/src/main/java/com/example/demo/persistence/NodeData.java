package com.example.demo.persistence;

import com.example.demo.models.IBeacon;
import com.example.demo.models.Node;

import java.sql.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Properties;

public class NodeData {
    static Connection connection = null;
    static String url = "jdbc:mysql://mysql-16806-0.cloudclusters.net:16806/GuidanceDB";

    //Open and return a database connection to use
    public static Connection OpenConnection() throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.jdbc.Driver");
        Properties p = new Properties();
        p.put("user", "GuidanceMember");
        p.put("password", "Guidance1234");
        connection = DriverManager.getConnection(url, p);
        return connection;
    }

    public void CreateNode(Node node) {
        try {
            int status;
            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            ResultSet rs = stmt.executeQuery("SELECT id FROM GuidanceDB.nodes WHERE ssid='"+ node.getSSID() +"' AND floorplanId='"+ node.getFloorplanid() +"' AND id='"+ node.getId() +"'");
            if(rs.next()){
                status = stmt.executeUpdate(" UPDATE GuidanceDB.nodes SET x='"+node.getX()+"',y='"+node.getY()+"',type='"+node.getType()+"',connectedNodes='"+node.getConnectednodes()+"',ssid='"+node.getSSID()+"',floorplanID='"+node.getFloorplanid()+"' WHERE ssid='"+ node.getSSID() +"' AND floorplanId='"+ node.getFloorplanid() +"' AND id='"+ node.getId() +"'");
            }
            else {
                status = stmt.executeUpdate("INSERT INTO `GuidanceDB`.`nodes` (`id`,`x`,`y`, `type`, `connectedNodes`, `ssid`, `floorplanId`) VALUES ('"+ node.getId()  +"', '"+ node.getX() +"', '"+ node.getY() + "', '"+ node.getType() + "', '"+ node.getConnectednodes() + "', '"+ node.getSSID() + "', '"+ node.getFloorplanid() + "');");
            }

            System.out.println("DB update status: " + status);
            rs.close();
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }

    public Collection<Node> GetNodes(String ssid, String floorplanId) {
        ArrayList<Node> nodes = new ArrayList<>();

        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            ResultSet rs = stmt.executeQuery("SELECT * FROM GuidanceDB.nodes WHERE ssid='"+ ssid +"' AND floorplanId='"+ floorplanId +"'");

            while(rs.next()) {
                Node node = new Node();
                node.setId(rs.getInt("id"));
                node.setX(rs.getInt("x"));
                node.setY(rs.getInt("y"));
                node.setType(rs.getString("type"));
                node.setConnectednodes(rs.getString("connectedNodes"));
                node.setSSID(rs.getString("ssid"));
                node.setFloorplanid(rs.getString("floorplanId"));
                nodes.add(node);
            }

            rs.close();
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }

        return nodes;
    }

    public void CreateIBeacon(IBeacon ibeacon) {
        try {
            int status;
            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            ResultSet rs = stmt.executeQuery("SELECT id FROM GuidanceDB.ibeacons WHERE ssid='"+ ibeacon.getSSID() +"' AND floorplanId='"+ ibeacon.getFloorplanid() +"' AND id='"+ ibeacon.getId() +"'");
            if(rs.next()){
                System.out.println(ibeacon.getName());
                status = stmt.executeUpdate(" UPDATE GuidanceDB.ibeacons SET x='"+ibeacon.getX()+"',y='"+ibeacon.getY()+"',type ='"+ibeacon.getType()+"',ssid='"+ibeacon.getSSID()+"',floorplanid='"+ibeacon.getFloorplanid()+"',name='"+ibeacon.getName()+"' WHERE ssid='"+ ibeacon.getSSID() +"' AND floorplanId='"+ ibeacon.getFloorplanid() +"' AND id='"+ ibeacon.getId() +"'");
            }
            else {
                status = stmt.executeUpdate("INSERT INTO GuidanceDB.ibeacons (`id`,`x`,`y`, `type`, `ssid`, `floorplanId`, `name`) VALUES ('"+ ibeacon.getId()  +"', '"+ ibeacon.getX() +"', '"+ ibeacon.getY() + "', '"+ ibeacon.getType() + "', '"+ ibeacon.getSSID() + "', '"+ ibeacon.getFloorplanid() + "', '"+ibeacon.getName()+"');");
            }

            System.out.println("DB update status: " + status);
            rs.close();
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }

    public Collection<IBeacon> GetIBeacons(String ssid, String floorplanId) {
        ArrayList<IBeacon> ibeacons = new ArrayList<>();

        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            ResultSet rs = stmt.executeQuery("SELECT * FROM GuidanceDB.ibeacons WHERE ssid='"+ ssid +"' AND floorplanId='"+ floorplanId +"'");

            while(rs.next()) {
                IBeacon ibeacon = new IBeacon();
                ibeacon.setId(rs.getInt("id"));
                ibeacon.setX(rs.getInt("x"));
                ibeacon.setY(rs.getInt("y"));
                ibeacon.setType(rs.getString("type"));
                ibeacon.setSSID(rs.getString("ssid"));
                ibeacon.setFloorplanid(rs.getString("floorplanId"));
                ibeacon.setName(rs.getString("name"));
                ibeacons.add(ibeacon);
            }

            rs.close();
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }

        return ibeacons;
    }

    public String GetFloorplanIdBySSIDAndBeaconName(String beaconname, String ssid) {
        String floorplanName = "";

        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            ResultSet rs = stmt.executeQuery("SELECT * FROM GuidanceDB.ibeacons WHERE ssid='"+ssid+"' AND name='"+beaconname+"'");

            while(rs.next()) {
                floorplanName = rs.getString("floorplanid");
            }

            rs.close();
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }

        return floorplanName;
    }

    public ArrayList<IBeacon> GetAllIBeacons() {
        ArrayList<IBeacon> ibeacons = new ArrayList<>();

        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            ResultSet rs = stmt.executeQuery("SELECT * FROM GuidanceDB.ibeacons");

            while(rs.next()) {
                IBeacon ibeacon = new IBeacon();
                ibeacon.setId(rs.getInt("id"));
                ibeacon.setX(rs.getInt("x"));
                ibeacon.setY(rs.getInt("y"));
                ibeacon.setType(rs.getString("type"));
                ibeacon.setSSID(rs.getString("ssid"));
                ibeacon.setFloorplanid(rs.getString("floorplanId"));
                ibeacon.setName(rs.getString("name"));
                ibeacons.add(ibeacon);
            }

            rs.close();
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }

        return ibeacons;
    }
}
