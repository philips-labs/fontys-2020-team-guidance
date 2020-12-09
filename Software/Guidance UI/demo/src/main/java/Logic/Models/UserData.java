package Logic.Models;

import java.util.*;

public class UserData {

    private String email;
    private Double distance1;
    private Double distance2;
    private Double distance3;
    private String location;
    private String coordinates;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCoordinates(Double distance1, Double distance2, Double distance3) {
        String location = "";
        List<String> circle1 = new ArrayList<>();
        circle1 = getCircleAroundBeacon(distance1, 100, 100);


        return location;
    }

    private List<String> getCircleAroundBeacon(Double distance, int beaconX, int beaconY) {
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