package Persistence;

import Logic.Models.UserData;

import java.sql.*;
import java.util.*;

public class UserDataData {
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

    public ArrayList<UserData> GetAllUserData() {
        ArrayList<UserData> userDataList = new ArrayList<>();

        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM WJnsvdUCVX.userdata");

            while(rs.next()) {
                UserData userData = new UserData();
                userData.setDistance1(rs.getDouble("distance1"));
                userData.setDistance2(rs.getDouble("distance2"));
                userData.setDistance3(rs.getDouble("distance3"));
                userData.setEmail(rs.getString("email"));
                userData.setLocation(rs.getString("location"));
                userDataList.add(userData);
            }

            rs.close();
            stmt.close();
            connection.close();
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
        }

        return userDataList;
    }

    public void CreateUserData(UserData userData) {
        try {
            connection = OpenConnection();
            Statement stmt = connection.createStatement();

            int status = stmt.executeUpdate("INSERT INTO `WJnsvdUCVX`.`userdata` (`email`,`distance1`,`distance2`, `distance3`,`location`) VALUES ('"+ userData.getEmail()  +"', '"+ userData.getDistance1() +"', '"+ userData.getDistance2() + "', '"+ userData.getDistance3() + "' , '"+ userData.getLocation() + "');");

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
            int status = stmt.executeUpdate("UPDATE WJnsvdUCVX.userdata SET email = '"+userData.getEmail()+"', distance1 = '"+ userData.getDistance1() +"', distance2 = '"+ userData.getDistance2() +"', distance3 = '"+ userData.getDistance3() +"', location = '"+ userData.getLocation() +"' WHERE email = '"+ givenEmail +"'");
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
            status += String.valueOf(stmt.executeUpdate("DELETE FROM `WJnsvdUCVX`.`userData` WHERE email='"+ givenEmail +"';"));
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
