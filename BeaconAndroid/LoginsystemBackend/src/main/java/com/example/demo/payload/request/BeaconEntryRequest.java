package com.example.demo.payload.request;

import javax.validation.constraints.NotBlank;

public class BeaconEntryRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String location;

    @NotBlank
    private Object[][] beaconsStats;

    public String getEmail(){ return this.email;}

    public void setEmail(String email){ this.email = email;}

    public String getLocation(){ return this.location;}

    public void setLocation(String location){ this.location = location;}

    public Object[][] getBeaconsStats(){ return this.beaconsStats;}

    public void setBeaconsStats(Object[][] beacons){ this.beaconsStats = beacons;}
}
