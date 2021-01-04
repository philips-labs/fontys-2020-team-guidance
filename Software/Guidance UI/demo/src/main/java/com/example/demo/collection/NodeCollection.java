package com.example.demo.collection;

import com.example.demo.models.IBeacon;
import com.example.demo.models.Node;
import com.example.demo.models.Path;
import com.example.demo.persistence.NodeData;

import java.util.ArrayList;
import java.util.Collection;

public class NodeCollection {

    NodeData crud = new NodeData();
    NodeData nodeData = new NodeData();
    private ArrayList<IBeacon> ibeaconList = new ArrayList<>();
    private ArrayList<Path> paths = new ArrayList<>();

    public Collection<Node> GetNodesBySSIDAndFloorplanId(String ssid, String floorplanId) {
        return crud.GetNodes(ssid, floorplanId);
    }

    public void SaveNode(Node node) {
        crud.CreateNode(node);
    }


    public Collection<IBeacon> GetBeaconsBySSIDAndFloorplanId(String ssid, String floorplanId) {
        return crud.GetIBeacons(ssid, floorplanId);
    }

    public IBeacon GetIBeaconByName(String name) {
        ibeaconList =  nodeData.GetAllIBeacons();

        if(ibeaconList != null) {
            for(IBeacon ibeacon : ibeaconList) {
                if(ibeacon.getName().equals(name)) {
                    return ibeacon;
                }
            }
            System.out.println("No beacon found with that name");
            return new IBeacon();
        }

        return null;
    }

    public void SaveIBeacon(IBeacon ibeacon) {
        crud.CreateIBeacon(ibeacon);
    }

    public String GetFloorplanIdByBeaconNameAndSSID(String ssid, String floorplanid) {
        return crud.GetFloorplanIdBySSIDAndBeaconName(ssid, floorplanid);
    }

    public void CreatePath(Path path) {
        System.out.println(path.getFloorplan());
        paths.add(path);
        crud.CreatePath(path);
    }

    public Collection<Path> GetPaths(String ssid, String floorplan) {
        return crud.GetPaths(ssid, floorplan);
    }
}
