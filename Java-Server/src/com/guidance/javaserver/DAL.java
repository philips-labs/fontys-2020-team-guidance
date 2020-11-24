package com.guidance.javaserver;

import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.HashMap;


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
            Class.forName("com.mysql.cj.jdbc.Driver");
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

    public static HashMap<Integer, Object[]> Read_Object(String query, String[] args) {
        Connection conn = EstablishDBConnection();

        try {
            Statement stmt = conn.createStatement();
            if (args != null) {
                for (int i = 0; i < args.length; i++) {
                    query = query.replace("@" + i, args[i]);
                }
            }
            ResultSet rs = stmt.executeQuery(query);
            HashMap<Integer, Object[]> tempHashMap = new HashMap<>();
            int i = 0;
            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();
            int countRow = 0;

            while (rs.next()) {
                countRow++;
                Object[] values = new Object[columnCount];
                int counter= i;
                for (int j = 1; j<=columnCount; j++){
                    values[j-1] = rs.getObject(j);
                }
                tempHashMap.put(counter, values);
                i++;
            }
            System.out.println(tempHashMap.size());
            return tempHashMap;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static HashMap<Integer, Object[]> GetImageCollection(){
        Connection conn = EstablishDBConnection();

        try {
            Statement stmt = conn.createStatement();

            HashMap<Integer, Object[]> imgCollection = new HashMap<>();

            String queryAllFloors = "SELECT id, title, ssid, floorplan FROM floor";
            ResultSet rs = stmt.executeQuery(queryAllFloors);
            while(rs.next()) {
                int id = rs.getInt("id");

                String title = rs.getString("title");

                String ssid = rs.getString("ssid");

                Blob imageBlob = rs.getBlob("floorplan");
                InputStream binaryStream = imageBlob.getBinaryStream(1, imageBlob.length());
                byte[] imageBytes = new byte[binaryStream.available()];
                binaryStream.read(imageBytes);

                imgCollection.put(id, new Object[]{title, ssid, /*imageBytes*/imageBlob});
            }
            conn.close();
            return imgCollection;
            }
        catch (SQLException e){
            e.printStackTrace();
            return null;
        }
        catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}


