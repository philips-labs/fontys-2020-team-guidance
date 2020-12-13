package com.example.demo.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "beaconStats")
public class BeaconEntry {
    @Id
    @NotBlank
    @Size(max = 50)
    private String email;

    @NotBlank
    @Size(max = 25)
    private String beac1Name;

    @NotBlank
    private int beac1Dist;

    @NotBlank
    @Size(max = 25)
    private String beac2Name;

    @NotBlank
    private int beac2Dist;

    @NotBlank
    @Size(max = 25)
    private String beac3Name;

    @NotBlank
    private int beac3Dist;

    public BeaconEntry(){}

    public BeaconEntry(String userEmail, Object[][] beacons){
        this.email = userEmail;
        this.beac1Name = (String)beacons[0][0];
        this.beac1Dist = (int)beacons[0][1];
        this.beac2Name = (String)beacons[1][0];
        this.beac2Dist = (int)beacons[1][1];
        this.beac3Name = (String)beacons[2][0];
        this.beac3Dist = (int)beacons[2][1];
    }

    public String getUserEmail(){ return this.email; }

    public void setUserEmail(String email){this.email = email;};

    public Object[][] getAllBeacons(){
        Object[][] temp = new Object[3][2];

        temp[0][0] = this.beac1Name;
        temp[0][1] = this.beac1Dist;
        temp[1][0] = this.beac2Name;
        temp[1][1] = this.beac2Dist;
        temp[2][0] = this.beac3Name;
        temp[2][1] = this.beac3Dist;

        return temp;
    }

    public void setAllBeacons(Object[][] beacons){
        this.beac1Name = (String)beacons[0][0];
        this.beac1Dist = (Integer)beacons[0][1];
        this.beac2Name = (String)beacons[1][0];
        this.beac2Dist = (Integer)beacons[1][1];
        this.beac3Name = (String)beacons[2][0];
        this.beac3Dist = (Integer)beacons[2][1];
    }
}
