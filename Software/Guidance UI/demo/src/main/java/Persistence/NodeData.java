package Persistence;

import Logic.Models.Node;

import java.sql.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Properties;

public class NodeData {
    static Connection connection = null;
    static String url = "jdbc:mysql://remotemysql.com:3306/WJnsvdUCVX";

    //Open and return a database connection to use
    public static Connection OpenConnection() throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.jdbc.Driver");
        Properties p = new Properties();
        p.put("user", "WJnsvdUCVX");
        p.put("password", "WMNo0fKK0Q");
        connection = DriverManager.getConnection(url, p);
        return connection;
    }

    public void CreateNode(Node node) {
        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            stmt.executeUpdate("SET SQL_SAFE_UPDATES = 0;");
            stmt.executeUpdate("DELETE FROM `guidance`.`nodes` WHERE ssid='"+ node.getSSID() +"' AND floorplanId='"+ node.getFloorplanid() +"'");
            stmt.executeUpdate("SET SQL_SAFE_UPDATES = 1;");

            int status = stmt.executeUpdate("INSERT INTO `WJnsvdUCVX`.`nodes` (`id`,`x`,`y`, `type`, `connectedNodes`, `ssid`, `floorplanId`) VALUES ('"+ node.getId()  +"', '"+ node.getX() +"', '"+ node.getY() + "', '"+ node.getType() + "', '"+ node.getConnectednodes() + "', '"+ node.getSSID() + "', '"+ node.getFloorplanid() + "');");

            System.out.println("DB update status: " + status);
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

            ResultSet rs = stmt.executeQuery("SELECT * FROM WJnsvdUCVX.nodes WHERE ssid='"+ ssid +"' AND floorplanId='"+ floorplanId +"'");

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
}
