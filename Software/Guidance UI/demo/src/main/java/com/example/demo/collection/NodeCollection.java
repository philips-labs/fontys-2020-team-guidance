package com.example.demo.collection;

import com.example.demo.models.IBeacon;
import com.example.demo.models.Node;
import com.example.demo.models.Path;
import com.example.demo.persistence.NodeData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

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

    public Collection<Path> GetPathsContainingStartAndEndNode(String ssid, String floorplan){
        return crud.GetPathsContainingStartAndEndNode(ssid, floorplan);
    }

    public void DeletePath(String ssid, String floorplan, String pathName) {
        crud.DeletePath(ssid, floorplan, pathName);
    }

    public Path LeastPopulatedPath(String ssid, String floorplan) {
        GetPaths(ssid, floorplan).forEach(item -> {
            System.out.println(item.getName());
            System.out.println(item.getPath());
        });
        Collection<Path> allPaths = GetPaths(ssid, floorplan);

        if(allPaths.size() == 0) { return new Path(); }

        Collection<Node> nodesFound = GetNodesBySSIDAndFloorplanId(ssid,floorplan);

        final int[] minimumPathPopulation = {Integer.MAX_VALUE};

        final Path[] correctPath = {new Path()};

        allPaths.forEach(item -> {
            List<Integer> pathListInteger = new ArrayList<>();
            String pathFiltered = item.getPath().replaceAll("[,]*","");
            for(int i=0;i<pathFiltered.length();i++){
                int nodeIndex = Integer.parseInt(String.valueOf(pathFiltered.charAt(i)));
                pathListInteger.add(nodeIndex);
                System.out.println(nodeIndex);
            }

            System.out.println(pathListInteger);

            int perPathSum = 0;

            Iterator<Node> iterator = nodesFound.iterator();

            while(iterator.hasNext())
            {
                Node node = iterator.next();
                if(pathListInteger.contains(node.getId())){
                    int userCount = node.getUserCount();
                    perPathSum += userCount;
                }
            }

            System.out.println(perPathSum);

            if(perPathSum < minimumPathPopulation[0]) {
                minimumPathPopulation[0] = perPathSum;
                correctPath[0] = item;
            }
        });

        return correctPath[0];
    }
}
