package com.example.demo.models;

import javax.persistence.*;
import javax.validation.Constraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "userdata",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "beacon1"),
                @UniqueConstraint(columnNames = "beacon2"),
                @UniqueConstraint(columnNames = "beacon3")
        })
public class BeaconEntry {
    @Id
    @NotBlank
    @Size(max = 50)
    private String email;

    @NotBlank
    @Size(max = 50)
    private String location;

    @NotBlank
    @Size(max = 25)
    private String beacon1;

    @NotBlank
    private double distance1;

    @NotBlank
    @Size(max = 25)
    private String beacon2;

    @NotBlank
    private double distance2;

    @NotBlank
    @Size(max = 25)
    private String beacon3;

    @NotBlank
    private double distance3;

    public BeaconEntry(){}

    public BeaconEntry(String userEmail, String location, String beacon1, String beacon2, String beacon3, double distance1, double distance2, double distance3){
        this.email = userEmail;
        this.location = location;
        this.beacon1 = beacon1;
        this.distance1 = distance1;
        this.beacon2 = beacon2;
        this.distance2= distance2;
        this.beacon3 = beacon3;
        this.distance3 = distance3;
    }

    public String getEmail(){ return this.email; }

    public void setEmail(String email){this.email = email;}

    public String getLocation(){return this.location;}

    public void setLocation(String location){ this.location = location;}

    public String getBeacon1() {
        return beacon1;
    }

    public void setBeacon1(String beacon1) {
        this.beacon1 = beacon1;
    }

    public double getDistance1() {
        return distance1;
    }

    public void setDistance1(double distance1) {
        this.distance1 = distance1;
    }

    public String getBeacon2() {
        return beacon2;
    }

    public void setBeacon2(String beacon2) {
        this.beacon2 = beacon2;
    }

    public double getDistance2() {
        return distance2;
    }

    public void setDistance2(double distance2) {
        this.distance2 = distance2;
    }

    public String getBeacon3() {
        return beacon3;
    }

    public void setBeacon3(String beacon3) {
        this.beacon3 = beacon3;
    }

    public double getDistance3() {
        return distance3;
    }

    public void setDistance3(double distance3) {
        this.distance3 = distance3;
    }
}
