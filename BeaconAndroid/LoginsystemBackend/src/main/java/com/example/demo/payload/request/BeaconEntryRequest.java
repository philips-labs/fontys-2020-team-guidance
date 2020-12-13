package com.example.demo.payload.request;

import javax.validation.constraints.NotBlank;

public class BeaconEntryRequest {
    @NotBlank
    private String email;

    @NotBlank
    private Object[][] beaconsStats;

    public String getEmail(){ return this.email;}

    public void setEmail(String email){ this.email = email;}

    public Object[][] getBeaconsStats(){ return this.beaconsStats;}

    public void setBeaconsStats(Object[][] beacons){ this.beaconsStats = beacons;}
}
