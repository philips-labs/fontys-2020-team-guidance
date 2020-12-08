package com.example.beaconscanner;

import java.sql.*;
import java.util.HashMap;

public class dbConn {
    private static HashMap<String, String> dbCreds = new HashMap<String, String>() {{
        put("Server_Name", "remotemysql.com");
        put("Port", "3306");
        put("Database_Name", "WJnsvdUCVX");
        put("User_Name", "WJnsvdUCVX");
        put("Password", "WMNo0fKK0Q");
    }};

    public static Connection EstablishConnection(){
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection dbConnection = DriverManager.getConnection(
                    "jdbc:mysql://" + dbCreds.get("Server_Name")
                            + ":" + dbCreds.get("Port")
                            + "/" + dbCreds.get("Database_Name")
                            + "?useSSL=true",
                    dbCreds.get("User_Name"),
                    dbCreds.get("Password"));
            return dbConnection;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }
}
