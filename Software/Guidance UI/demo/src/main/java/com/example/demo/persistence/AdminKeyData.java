package com.example.demo.persistence;

import com.example.demo.models.AdminKey;

import java.sql.*;
import java.util.*;

public class AdminKeyData {
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

    public ArrayList<AdminKey> GetAllAdminKeys() {
        ArrayList<AdminKey> adminKeys = new ArrayList<>();

        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM GuidanceDB.adminkeys");

            while(rs.next()) {
                AdminKey adminkey = new AdminKey();
                adminkey.setKey(rs.getString("adminkey"));
                adminkey.setSSID(rs.getString("ssid"));
                adminKeys.add(adminkey);
            }

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
            ResultSet rs = stmt.executeQuery("SELECT * FROM GuidanceDB.superadminkeys WHERE adminkey = '"+ key +"';");
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

            int status = stmt.executeUpdate("INSERT INTO GuidanceDB.adminkeys (`adminkey`,`ssid`) VALUES ('"+ adminKey.getKey()  +"', '" + adminKey.getSSID() + "');");

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

            int status = stmt.executeUpdate("UPDATE GuidanceDB.adminkeys SET adminkey = '"+adminKey.getKey()+"', ssid = '"+ adminKey.getSSID() +"' WHERE adminkey = '"+ oldAdminKey +"'");

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
            status += String.valueOf(stmt.executeUpdate("DELETE FROM `GuidanceDB`.`adminkeys` WHERE adminkey='"+ key +"';"));
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
