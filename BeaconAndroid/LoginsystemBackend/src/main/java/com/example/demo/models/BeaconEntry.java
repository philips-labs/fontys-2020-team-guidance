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
    private int distance1;

    @NotBlank
    @Size(max = 25)
    private String beacon2;

    @NotBlank
    private int distance2;

    @NotBlank
    @Size(max = 25)
    private String beacon3;

    @NotBlank
    private int distance3;

    public BeaconEntry(){}

    public BeaconEntry(String userEmail, String location, Object[][] beacons){
        this.email = userEmail;
        this.location = location;
        this.beacon1 = (String)beacons[0][0];
        this.distance1 = (int)beacons[0][1];
        this.beacon2 = (String)beacons[1][0];
        this.distance2= (int)beacons[1][1];
        this.beacon3 = (String)beacons[2][0];
        this.distance3 = (int)beacons[2][1];
    }

    public String getEmail(){ return this.email; }

    public void setEmail(String email){this.email = email;}

    public String getLocation(){return this.location;}

    public void setLocation(String location){ this.location = location;}

    public Object[][] getAllBeacons(){
        Object[][] temp = new Object[3][2];

        temp[0][0] = this.beacon1;
        temp[0][1] = this.distance1;
        temp[1][0] = this.beacon2;
        temp[1][1] = this.distance2;
        temp[2][0] = this.beacon3;
        temp[2][1] = this.distance3;

        return temp;
    }

    public void setAllBeacons(Object[][] beacons){
        this.beacon1 = (String)beacons[0][0];
        this.distance1 = (Integer)beacons[0][1];
        this.beacon2 = (String)beacons[1][0];
        this.distance2 = (Integer)beacons[1][1];
        this.beacon3 = (String)beacons[2][0];
        this.distance3 = (Integer)beacons[2][1];
    }
}
