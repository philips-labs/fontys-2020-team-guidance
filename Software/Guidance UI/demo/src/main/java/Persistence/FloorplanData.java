package Persistence;

import Logic.Models.Floorplan;

import java.sql.*;
import java.util.*;

public class FloorplanData {
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

    public ArrayList<Floorplan> GetAllFloorplans() {
        ArrayList<Floorplan> Floorplans = new ArrayList<>();

        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM WJnsvdUCVX.floorplans");

            while(rs.next()) {
                Floorplan floorplan = new Floorplan();
                floorplan.setSSID(rs.getString("ssid"));
                floorplan.setName(rs.getString("name"));
                floorplan.setImage(rs.getString("image"));
                floorplan.setWidth(rs.getDouble("width"));
                floorplan.setScale(rs.getDouble("scale"));
                Floorplans.add(floorplan);
            }

            rs.close();
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }

        return Floorplans;
    }

    public void CreateFloorplan(Floorplan floorplan) {
        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            int status = stmt.executeUpdate("INSERT INTO `WJnsvdUCVX`.`floorplans` (`image`,`ssid`,`name`, `width`, `scale`) VALUES ('"+ floorplan.getImage()  +"', '"+ floorplan.getSSID() +"', '"+ floorplan.getName() + "', '"+ floorplan.getWidth() + "', '"+ floorplan.getScale() + "');");

            System.out.println("DB update status: " + status);
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }

    public void UpdateFloorplan(Floorplan floorplan) {
        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            int status = stmt.executeUpdate("");
            System.out.println("DB update status: " + status);
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }

    public void DeleteFloorplan(String name) {
        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            String status = "";
            status += String.valueOf(stmt.executeUpdate("SET SQL_SAFE_UPDATES = 0;"));
            status += String.valueOf(stmt.executeUpdate("DELETE FROM `WJnsvdUCVX`.`floorplans` WHERE name='"+ name +"';"));
            status += String.valueOf(stmt.executeUpdate("SET SQL_SAFE_UPDATES = 1;"));
            System.out.println("DB update status: " + status);
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }
}
