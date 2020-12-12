package Logic.Models;

import java.util.*;

public class UserData {

    private String email;
    private String beacon1;
    private Double distance1;
    private String beacon2;
    private Double distance2;
    private String beacon3;
    private Double distance3;
    private String location;
    private String coordinates;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Double getDistance1() {
        return distance1;
    }

    public void setDistance1(Double distance1) {
        this.distance1 = distance1;
    }

    public Double getDistance2() {
        return distance2;
    }

    public void setDistance2(Double distance2) {
        this.distance2 = distance2;
    }

    public Double getDistance3() {
        return distance3;
    }

    public void setDistance3(Double distance3) {
        this.distance3 = distance3;
    }

    public String getLocation() {
        // coordinaten van beacons bemachtigen
        // creeer 3 arrays met circel coordinaten
        // locatie achterhalen
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCoordinates(String beacon1, Double distance1, Double scale, Double distance2, Double distance3) {
        String location = "";
        List<String> circle1 = new ArrayList<>();
        circle1 = getCircleAroundBeacon(beacon1, distance1, scale, 100, 100);


        return location;
    }

    private List<String> getCircleAroundBeacon(String beacon, Double distance, Double scale, int beaconX, int beaconY) {
        List<String> circle = new ArrayList<>();

        for(var degree=0;degree<360;degree++){
            var radians = degree * Math.PI/180;
            var x = beaconX + distance * Math.cos(radians);
            var y = beaconY + distance * Math.sin(radians);
            circle.add(x + ";" + y);
        }
        return circle;
    }
}