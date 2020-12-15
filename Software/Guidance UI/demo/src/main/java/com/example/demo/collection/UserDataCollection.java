package com.example.demo.collection;

import com.example.demo.models.IBeacon;
import com.example.demo.models.UserData;
import com.example.demo.persistence.UserDataData;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class UserDataCollection {
    UserDataData userDataData = new UserDataData();
    private ArrayList<UserData> userDataList = new ArrayList<>();

    public UserData GetUserDatasByEmail(String email) {
        userDataList = userDataData.GetAllUserData();

        if(userDataList != null) {
            for(UserData userData : userDataList) {
                if(userData.getEmail().equals(email)) {
                    return userData;
                }
            }
        }

        return null;
    }

    public UserData GetUserDataByEmail(String email) {
        userDataList =  userDataData.GetAllUserData();

        if(userDataList != null) {
            for(UserData userData : userDataList) {
                if(userData.getEmail().equals(email)) {
                    return userData;
                }
            }
        }

        return null;
    }

    public UserData AddUserData(UserData userData) {
        if(!UserDataEmailExists(userData)) {
            userDataList.add(userData);
            userDataData.CreateUserData(userData);
        }

        return GetUserDatasByEmail(userData.getEmail());
    }

    public Boolean UserDataEmailExists(UserData userData) {
        for(UserData userData1 : userDataList) {
            if(userData1.getEmail().equals(userData.getEmail())) {
                return true;
            }
        }

        return false;
    }

    public UserData DeleteUserData(String givenEmail) { // Deze is sws fout! even in de gaten houden
        String email = "";

        userDataData.DeleteUserData(givenEmail);

        for(int i = 0; i < userDataList.size(); i++) {
            if(userDataList.get(i).getEmail().equals(givenEmail)) {
                email = userDataList.get(i).getEmail();
                userDataList.remove(i);
            }
        }

        return GetUserDatasByEmail(email);
    }

    public String getLocationByEmail(String email) { // NOTE: staat heel veel dubbele code in, door tijdgebrek heb ik dit nog niet opgeschoond
        String location = "";
        NodeCollection nodeCollection = new NodeCollection();
        FloorplanCollection floorplanCollection = new FloorplanCollection();
        UserData userData = GetUserDataByEmail(email);
        IBeacon beacon1 = nodeCollection.GetIBeaconByName(userData.getBeacon1());
        IBeacon beacon2 = nodeCollection.GetIBeaconByName(userData.getBeacon2());
        IBeacon beacon3 = nodeCollection.GetIBeaconByName(userData.getBeacon3());

        // coordinaten van beacons bemachtigen
        int beacon1X = beacon1.getX();
        int beacon1Y = beacon1.getY();
        int beacon2X = beacon2.getX();
        int beacon2Y = beacon2.getY();
        int beacon3X = beacon3.getX();
        int beacon3Y = beacon3.getY();

        // scale bemachtigen
        double scale = floorplanCollection.GetFloorplanByNameAndSSID(beacon1.getFloorplanid(), beacon1.getSSID()).getScale();

        // creëer 3 lists met circel coordinaten
        List<String> beacon1CircelList = getCircleAroundBeacon(userData.getDistance1(), scale, beacon1X, beacon1Y);
        List<String> beacon2CircelList = getCircleAroundBeacon(userData.getDistance2(), scale, beacon2X, beacon2Y);
        List<String> beacon3CircelList = getCircleAroundBeacon(userData.getDistance3(), scale, beacon3X, beacon3Y);

        // locatie achterhalen vanaf dit punt
        List<Double> smallestDistances = new ArrayList<>();
        List<String> beacon1Coordinates = new ArrayList<>();
        List<String> beacon2Coordinates = new ArrayList<>();
        double beacon3ShortestDistance = 0;
        String beacon3ClosestCoordinate = "";
        String beacon3LinkedCoordinate = "";
        int count = 0;

        // kijken op welke 2 punten de eerste 2 circels kruisen
        if(beacon1CircelList != null) {
            for(String coordinate1 : beacon1CircelList) {
                List<String> coordinates1 = new ArrayList<String>(Arrays.asList(coordinate1.split(";")));
                String X1 = coordinates1.get(0);
                String Y1 = coordinates1.get(1);

                // elke coordinaat in circel 1 wordt de afstand mee vergeleken met elke coordinaat in circel 2
                if(beacon2CircelList != null) {
                    for(String coordinate2 : beacon2CircelList) {
                        List<String> coordinates2 = new ArrayList<String>(Arrays.asList(coordinate2.split(";")));
                        String X2 = coordinates2.get(0);
                        String Y2 = coordinates2.get(1);
                        double sideX = Double.parseDouble(X1) - Double.parseDouble(X2);
                        double sideY = Double.parseDouble(Y1) - Double.parseDouble(Y2);

                        if (sideX < 0) {
                            sideX = Math.abs(sideX);
                        }
                        if (sideY < 0) {
                            sideY = Math.abs(sideY);
                        }

                        // stelling van pythagoras toepassen om de afstand tussen beide coordinaten te weten
                        double distance = Math.sqrt(Math.pow(sideX, 2) + Math.pow(sideY, 2));

                        // hier wordt een lijst gemaakt met de 7 kortste afstanden tussen de coordianten
                        // ook worden er 2 lijsten gemaakt met de bijhorende coordinaten
                        if (count < 7) {
                            smallestDistances.add(distance);
                            beacon1Coordinates.add(coordinate1);
                            beacon2Coordinates.add(coordinate2);
                            count++;
                        }
                        else {
                            double maxDistance = getMax(smallestDistances);
                            if (distance < maxDistance) {
                                for (int i=0;i<smallestDistances.size();i++) {
                                    if (smallestDistances.get(i) == maxDistance) {
                                        smallestDistances.remove(i);
                                        beacon1Coordinates.remove(i);
                                        beacon2Coordinates.remove(i);

                                        smallestDistances.add(distance);
                                        beacon1Coordinates.add(coordinate1);
                                        beacon2Coordinates.add(coordinate2);
                                        i = smallestDistances.size();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        List<String> averageCoordinates = getAverageCoordinates(beacon1Coordinates, beacon2Coordinates);

        // nu gaan we kijken welke coordinaten het dichtste liggen bij de averageCoordinates list hierboven. De user zal zich daar moeten bevinden.
        if(beacon3CircelList != null) {
            for (String coordinate : averageCoordinates) {
                List<String> coordinates = new ArrayList<String>(Arrays.asList(coordinate.split(";")));
                String XA = coordinates.get(0);
                String YA = coordinates.get(1);

                for (String coordinate3 : beacon3CircelList) {
                    List<String> coordinates3 = new ArrayList<String>(Arrays.asList(coordinate3.split(";")));
                    String X3 = coordinates3.get(0);
                    String Y3 = coordinates3.get(1);
                    double sideX = Double.parseDouble(XA) - Double.parseDouble(X3);
                    double sideY = Double.parseDouble(YA) - Double.parseDouble(Y3);

                    if (sideX < 0) {
                        sideX = Math.abs(sideX);
                    }
                    if (sideY < 0) {
                        sideY = Math.abs(sideY);
                    }

                    // stelling van pythagoras toepassen om de afstand tussen beide coordinaten te weten
                    double distance = Math.sqrt(Math.pow(sideX, 2) + Math.pow(sideY, 2));

                    if (beacon3ShortestDistance == 0) {
                        beacon3ShortestDistance = distance;
                        beacon3ClosestCoordinate = coordinate3;
                        beacon3LinkedCoordinate = coordinate;
                    }
                    else {
                        if (distance < beacon3ShortestDistance) {
                            beacon3ShortestDistance = distance;
                            beacon3ClosestCoordinate = coordinate3;
                            beacon3LinkedCoordinate = coordinate;
                        }
                    }
                }
            }
        }

        List<String> tempList = new ArrayList<>();
        List<String> tempList2 = new ArrayList<>();
        tempList.add(beacon3ClosestCoordinate);
        tempList2.add(beacon3LinkedCoordinate);
        location = getAverageCoordinates(tempList, tempList2).get(0);

        return location;
    }

    private List<String> getCircleAroundBeacon(Double distance, Double scale, int beaconX, int beaconY) {
        List<String> circle = new ArrayList<>();

        for(var degree=0;degree<360;degree++){
            var radians = degree * Math.PI/180;
            var pixelDistance = distance * scale;
            var x = beaconX + pixelDistance * Math.cos(radians);
            var y = beaconY + pixelDistance * Math.sin(radians);
            circle.add(x + ";" + y);
        }
        return circle;
    }

    private double getMax(List<Double> list){
        double max = Double.MIN_VALUE;
        for(int i=0; i<list.size(); i++){
            if(list.get(i) > max){
                max = list.get(i);
            }
        }
        return max;
    }

    private List<String> getAverageCoordinates(List<String> coordinates1, List<String> coordinates2) {
        List<String> coordinates = new ArrayList<>();
        for(int i=0; i<coordinates1.size(); i++){
            List<String> coordinates1XY = new ArrayList<String>(Arrays.asList(coordinates1.get(i).split(";")));
            double X1 = Double.parseDouble(coordinates1XY.get(0));
            double Y1 = Double.parseDouble(coordinates1XY.get(1));
            List<String> coordinates2XY = new ArrayList<String>(Arrays.asList(coordinates2.get(i).split(";")));
            double X2 = Double.parseDouble(coordinates2XY.get(0));
            double Y2 = Double.parseDouble(coordinates2XY.get(1));

            double X = (X1 + X2) / 2;
            double Y = (Y1 + Y2) / 2;
            coordinates.add(X + ";" + Y);
        }
        return coordinates;
    }
}
