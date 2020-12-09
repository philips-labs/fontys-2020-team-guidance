package Persistence;

import Logic.Models.AdminKey;

import java.sql.*;
import java.util.*;

public class AdminKeyData {
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

    public ArrayList<AdminKey> GetAllAdminKeys() {
        ArrayList<AdminKey> adminKeys = new ArrayList<>();

        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM WJnsvdUCVX.adminkeys");

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

    //Check if the super-admin key exists
    public Boolean CheckSuperadmin(String key) {
        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM WJnsvdUCVX.superadminkeys WHERE adminkey = '"+ key +"';");
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

            int status = stmt.executeUpdate("INSERT INTO WJnsvdUCVX.adminkeys (`adminkey`,`ssid`) VALUES ('"+ adminKey.getKey()  +"', '" + adminKey.getSSID() + "');");

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

            int status = stmt.executeUpdate("UPDATE WJnsvdUCVX.adminkeys SET adminkey = '"+adminKey.getKey()+"', ssid = '"+ adminKey.getSSID() +"' WHERE adminkey = '"+ oldAdminKey +"'");

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
            stmt.executeUpdate("SET SQL_SAFE_UPDATES = 0;");
            status += String.valueOf(stmt.executeUpdate("DELETE FROM `WJnsvdUCVX`.`adminkeys` WHERE adminkey='"+ key +"';"));
            stmt.executeUpdate("SET SQL_SAFE_UPDATES = 1;");
            System.out.println("DB update status: " + status);
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }
    }
}