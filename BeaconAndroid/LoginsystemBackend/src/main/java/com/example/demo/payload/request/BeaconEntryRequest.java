package com.example.demo.payload.request;

import javax.validation.constraints.NotBlank;

public class BeaconEntryRequest {
    @NotBlank
    private String email;
    private String location;
    private double distance1;
    private double distance2;
    private double distance3;
    private String beacon1;
    private String beacon2;
    private String beacon3;

    public double getDistance1() {
        return distance1;
    }

    public void setDistance1(double distance1) {
        this.distance1 = distance1;
    }

    public double getDistance2() {
        return distance2;
    }

    public void setDistance2(double distance2) {
        this.distance2 = distance2;
    }

    public double getDistance3() {
        return distance3;
    }

    public void setDistance3(double distance3) {
        this.distance3 = distance3;
    }

    public String getBeacon1() {
        return beacon1;
    }

    public void setBeacon1(String beacon1) {
        this.beacon1 = beacon1;
    }

    public String getBeacon2() {
        return beacon2;
    }

    public void setBeacon2(String beacon2) {
        this.beacon2 = beacon2;
    }

    public String getBeacon3() {
        return beacon3;
    }

    public void setBeacon3(String beacon3) {
        this.beacon3 = beacon3;
    }

    public String getEmail(){ return this.email;}

    public void setEmail(String email){ this.email = email;}

    public String getLocation(){ return this.location;}

    public void setLocation(String location){ this.location = location;}
}
