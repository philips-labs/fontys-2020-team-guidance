package com.example.demo.models;

public class Node {
    private int Id;
    private int X;
    private int Y;
    private String Type;
    private String SSID;
    private String Floorplanid;
    private int UserCount;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        this.Id = id;
    }

    public int getX() {
        return X;
    }

    public void setX(int x) {
        this.X = x;
    }

    public int getY() {
        return Y;
    }

    public void setY(int y) {
        this.Y = y;
    }

    public String getType() {
        return Type;
    }

    public void setType(String type) {
        this.Type = type;
    }

    public String getSSID() {
        return SSID;
    }

    public void setSSID(String SSID) {
        this.SSID = SSID;
    }

    public String getFloorplanid() {
        return Floorplanid;
    }

    public void setFloorplanid(String floorplanid) {
        Floorplanid = floorplanid;
    }

    public int getUserCount() {
        return UserCount;
    }

    public void setUserCount(int userCount) {
        UserCount = userCount;
    }
}
