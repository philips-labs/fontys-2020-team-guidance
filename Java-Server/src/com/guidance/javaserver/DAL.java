package com.guidance.javaserver;

import java.sql.*;
import java.util.HashMap;
import java.util.Properties;


public class DAL {
    private static HashMap<String, String> credentials = new HashMap<>() {{
        put("Server_Name", "remotemysql.com");
        put("Port", "3306");
        put("Database_Name", "WJnsvdUCVX");
        put("User_Name", "WJnsvdUCVX");
        put("Password", "WMNo0fKK0Q");
    }};


    private static Connection EstablishDBConnection() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection dbConnection = DriverManager.getConnection(
                    "jdbc:mysql://" + credentials.get("Server_Name")
                            + ":" + credentials.get("Port")
                            + "/" + credentials.get("Database_Name")
                            + "?useSSL=true",
                    credentials.get("User_Name"),
                    credentials.get("Password"));
            return dbConnection;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String CreateUpdateDelete_Object(int selector, String query, String[] args) {
        Connection conn = EstablishDBConnection();
        if (conn == null) return "-1";
        if (args == null || args.length == 0) return "-2";
        if (query == null || query.isBlank()) return "-3";
        try {
            for (int i = 0; i < args.length; i++) {
                query = query.replace("@" + i, args[i]);
            }
            Statement stmt = conn.createStatement();

            var response = stmt.executeUpdate(query);
            conn.close(); // check for catching this specific exception for closing the connection
            return String.valueOf(response);

        } catch (SQLException e) {
            e.printStackTrace();
            return "0";
        }
    }

    public static HashMap<String, String[]> Read_Object(String query, String[] args) {
        Connection conn = EstablishDBConnection();

        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("select id, Name, Age, Gender, Email from user");

            HashMap<String, String[]> tempHashMap = new HashMap<String, String[]>();

            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("Name");
                int age = rs.getInt("Age");
                String gender = rs.getString("Gender");
                String email = rs.getString("Email");
                tempHashMap.put(String.valueOf(id), new String[]{name, email, String.valueOf(age), gender});
                //System.out.println(id + "," + name + "," + email + "," + age + "," + gender);

            }
            //System.out.println(tempHashMap.size());
            return tempHashMap;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}


