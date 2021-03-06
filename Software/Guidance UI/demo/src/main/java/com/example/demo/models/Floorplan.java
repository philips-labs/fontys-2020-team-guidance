package com.example.demo.models;

public class Floorplan {
    private String SSID;
    private String Image;
    private String Name;
    private Double Width;
    private Double Scale;

    public String getSSID() {
        return SSID;
    }

    public void setSSID(String SSID) {
        this.SSID = SSID;
    }

    public String getImage() {
        return Image;
    }

    public void setImage(String image) {
        Image = image;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public Double getWidth() {
        return Width;
    }

    public void setWidth(Double width) {
        Width = width;
    }

    public Double getScale() {
        return Scale;
    }

    public void setScale(Double scale) {
        Scale = scale;
    }
}
