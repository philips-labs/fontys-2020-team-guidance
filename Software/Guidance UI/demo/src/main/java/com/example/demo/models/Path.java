package com.example.demo.models;

public class Path {
    private String Name;
    private String Path;
    private String SSID;
    private String Floorplan;
    private String Color;

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getPath() {
        return Path;
    }

    public void setPath(String path) {
        Path = path;
    }

    public String getSSID() {
        return SSID;
    }

    public void setSSID(String SSID) {
        this.SSID = SSID;
    }

    public String getFloorplan() {
        return Floorplan;
    }

    public void setFloorplan(String floorplan) {
        Floorplan = floorplan;
    }

    public String getColor() {
        return Color;
    }

    public void setColor(String color) {
        Color = color;
    }
}
