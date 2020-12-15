package com.example.demo.collection;

import com.example.demo.models.Floorplan;
import com.example.demo.persistence.FloorplanData;

import java.sql.SQLSyntaxErrorException;
import java.util.ArrayList;
import java.util.Collection;

public class FloorplanCollection {
    FloorplanData FloorplanData = new FloorplanData();
    private ArrayList<Floorplan> Floorplans = new ArrayList<>();

    public Collection<Floorplan> GetFloorplansBySSID(String ssid) {
        Floorplans =  FloorplanData.GetAllFloorplans();

        if(Floorplans != null) {
            ArrayList<Floorplan> floorplans = new ArrayList<>();

            for(Floorplan floorplan : Floorplans) {
                if(floorplan.getSSID().equals(ssid)) {
                    floorplans.add(floorplan);
                }
            }

            return floorplans;
        }

        return null;
    }

    public Floorplan GetFloorplanBySSID(String ssid) {
        Floorplans =  FloorplanData.GetAllFloorplans();

        if(Floorplans != null) {
            for(Floorplan floorplan : Floorplans) {
                if(floorplan.getSSID().equals(ssid)) {
                    return floorplan;
                }
            }
        }

        return null;
    }

    public Collection<Floorplan> AddFloorplan(Floorplan floorplan) {
        if(!FloorplanNameExists(floorplan)) {
            Floorplans.add(floorplan);
            FloorplanData.CreateFloorplan(floorplan);
        }

        return GetFloorplansBySSID(floorplan.getSSID());
    }

    public Boolean FloorplanNameExists(Floorplan floorplan) {
        for(Floorplan floorPlan : Floorplans) {
            if(floorPlan.getName().equals(floorplan.getName()) && floorPlan.getSSID().equals(floorplan.getSSID())) {
                return true;
            }
        }

        return false;
    }

    public Collection<Floorplan> DeleteFloorplan(String name) {
        String ssid = "";

        FloorplanData.DeleteFloorplan(name);

        for(int i = 0; i < Floorplans.size(); i++) {
            if(Floorplans.get(i).getName().equals(name)) {
                ssid = Floorplans.get(i).getSSID();
                Floorplans.remove(i);
            }
        }

        return GetFloorplansBySSID(ssid);
    }

    public Floorplan GetFloorplanByNameAndSSID(String name, String ssid) {
        GetFloorplansBySSID(ssid);
        for(Floorplan floorplan : Floorplans) {
            if(floorplan.getName().equals(name) && floorplan.getSSID().equals(ssid)) {
                return floorplan;
            }
        }

        System.out.println("KAPUT");
        return new Floorplan();
    }

    public void updateFloorplanImage(String image, String ssid, String floorplanid) {
        FloorplanData.UpdateFloorplanImage(image, ssid, floorplanid);
    }

//    public ArrayList<Floorplan> GetFloorplansByName(String name) {
//        Floorplans = FloorplanData.GetAllFloorplans();
//        ArrayList<Floorplan> floorplanList = new ArrayList<>();
//
//        for(Floorplan floorplan : Floorplans) {
//            if(floorplan.getName().equals(name)) {
//                floorplanList.add(floorplan);
//            }
//        }
//        return floorplanList;
//    }
}
