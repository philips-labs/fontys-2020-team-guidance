package Persistence;

import Logic.Models.AdminKey;
import Logic.Models.Floorplan;

import java.sql.*;
import java.util.*;

public class AdminKeyData {
    static Connection connection = null;
    static String url = "jdbc:mysql://localhost:3306/guidance";

    public static Connection OpenConnection() throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.jdbc.Driver");
        Properties p = new Properties();
        p.put("user", "root");
        p.put("password", "Prosoccer12");
        connection = DriverManager.getConnection(url, p);
        return connection;
    }

    public ArrayList<AdminKey> GetAllAdminKeys() {
        ArrayList<AdminKey> adminKeys = new ArrayList<>();

        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM guidance.adminkeys");

            while(rs.next()) {
                AdminKey adminkey = new AdminKey();
                adminkey.setKey(rs.getString("adminkey"));
                adminkey.setSSID(rs.getString("ssid"));
                adminKeys.add(adminkey);
            }

            System.out.println("test");

            rs.close();
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }

        return adminKeys;
    }

    public Boolean CheckSuperadmin(String key) {
        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM guidance.superadminkeys WHERE adminkey = '"+ key +"';");
            if(rs.next()) {
                stmt.close();
                connection.close();
                return true;
            }
            else {
                stmt.close();
                connection.close();
                return false;
            }
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }

        return false;
    }

    public void CreateAdminkey(AdminKey adminKey) {
        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            int status = stmt.executeUpdate("INSERT INTO guidance.adminkeys (`adminkey`,`ssid`) VALUES ('"+ adminKey.getKey()  +"', '" + adminKey.getSSID() + "');");

            System.out.println("DB update status: " + status);
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }

    public void UpdateAdminKey(AdminKey adminKey, String oldAdminKey) {
        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            System.out.println(adminKey.getKey() + ", " + adminKey.getSSID());

            int status = stmt.executeUpdate("UPDATE guidance.adminkeys SET adminkey = '"+adminKey.getKey()+"', ssid = '"+ adminKey.getSSID() +"' WHERE adminkey = '"+ oldAdminKey +"'");

            System.out.println("DB update status: " + status);
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }

    public void DeleteAdminKey(String key) {
        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            String status = "";
            status += String.valueOf(stmt.executeUpdate("SET SQL_SAFE_UPDATES = 0;"));
            status += String.valueOf(stmt.executeUpdate("DELETE FROM `guidance`.`adminkeys` WHERE adminkey='"+ key +"';"));
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
