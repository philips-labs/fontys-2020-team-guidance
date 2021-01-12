package com.example.demo.controllers;

import com.example.demo.collection.AdminKeyCollection;
import com.example.demo.collection.FloorplanCollection;
import com.example.demo.collection.NodeCollection;
import com.example.demo.models.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/floorplan")
public class FloorplanController {

    FloorplanCollection floorplans = new FloorplanCollection();
    AdminKeyCollection adminKeys = new AdminKeyCollection();
    NodeCollection nodes = new NodeCollection();

    //Get first floorplan of list sorted by SSID
    @GetMapping("/getFloorplanBySSID/{ssid}")
    public ResponseEntity<String> GetFloorplanBySSID(@PathVariable String ssid) {
        return new ResponseEntity<>(floorplans.GetFloorplanBySSID(ssid).getImage(), HttpStatus.OK);
    }

    //Check if admin key exists
    @GetMapping("/checkKey/{key}")
    public ResponseEntity<String> CheckAdminKey(@PathVariable String key) {
        return new ResponseEntity<>(adminKeys.GetAdminSSIDByKey(key), HttpStatus.OK);
    }

    @GetMapping("/getFloorplan/{ssid}/{name}")
    public ResponseEntity<Floorplan> GetFloorplanBySSIDAndName(@PathVariable String name, @PathVariable String ssid) {
        return new ResponseEntity<>(floorplans.GetFloorplanByNameAndSSID(name, ssid), HttpStatus.OK);
    }

    @GetMapping("/getFloorplansBySSID/{ssid}")
    public ResponseEntity<Collection<Floorplan>> GetFloorplansBySSID(@PathVariable String ssid) {
        return new ResponseEntity<>(floorplans.GetFloorplansBySSID(ssid), HttpStatus.OK);
    }

    @PostMapping("/createFloorplan")
    public ResponseEntity<Collection<Floorplan>> AddFloorplan(@RequestBody Floorplan floorplan) {
        return new ResponseEntity<>(floorplans.AddFloorplan(floorplan), HttpStatus.OK);
    }

    @PutMapping("/updateFloorplan/{ssid}/{floorplanID}")
    public ResponseEntity<HttpStatus> UpdateFloorplan(@RequestBody String image, @PathVariable String ssid, @PathVariable String floorplanID) {
        floorplans.updateFloorplanImage(image, ssid, floorplanID);
        System.out.println("yes");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteFloorplan/{floorplanname}")
    public ResponseEntity<Collection<Floorplan>> DeleteFloorplan(@PathVariable String floorplanname) {
        return new ResponseEntity<>(floorplans.DeleteFloorplan(floorplanname), HttpStatus.OK);
    }

    //Check if super-admin key exists
    @GetMapping("/checkSuperAdmin/{key}")
    public ResponseEntity<Collection<AdminKey>> CheckSuperAdmin(@PathVariable String key) {
        return new ResponseEntity<>(adminKeys.CheckAdmin(key), HttpStatus.OK);
    }

    @PutMapping("/editKey/{key}")
    public ResponseEntity<Collection<AdminKey>> EditAdminKey(@PathVariable String key, @RequestBody String newValue) {
        return new ResponseEntity<>(adminKeys.EditAdminKey(key, newValue), HttpStatus.OK);
    }

    //Edit ssid linked to admin key
    @PutMapping("/editSSID/{key}")
    public ResponseEntity<Collection<AdminKey>> EditSSID(@PathVariable String key, @RequestBody String newValue) {
        return new ResponseEntity<>(adminKeys.EditSSID(key, newValue), HttpStatus.OK);
    }

    @DeleteMapping("/deleteKey/{key}")
    public ResponseEntity<Collection<AdminKey>> DeleteAdminKey(@PathVariable String key) {
        return new ResponseEntity<>(adminKeys.DeleteAdminKey(key), HttpStatus.OK);
    }

    @PostMapping("/addAdminKey")
    public ResponseEntity<Collection<AdminKey>> AddAdminKey(@RequestBody AdminKey adminKey) {
        return new ResponseEntity<>(adminKeys.AddAdminKey(adminKey), HttpStatus.OK);
    }

    @PostMapping("/saveNode")
    public ResponseEntity<HttpStatus> CreateNode(@RequestBody Node node) {
        nodes.SaveNode(node);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/getNodes/{ssid}/{floorplanid}")
    public ResponseEntity<Collection<Node>> GetNodeById(@PathVariable String ssid, @PathVariable String floorplanid) {
        return new ResponseEntity<>(nodes.GetNodesBySSIDAndFloorplanId(ssid, floorplanid), HttpStatus.OK);
    }

    @PostMapping("/saveBeacon")
    public ResponseEntity<HttpStatus> CreateNode(@RequestBody IBeacon ibeacon) {
        nodes.SaveIBeacon(ibeacon);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/getBeacons/{ssid}/{floorplanid}")
    public ResponseEntity<Collection<IBeacon>> CreateBeacon(@PathVariable String ssid, @PathVariable String floorplanid) {
        return new ResponseEntity<>(nodes.GetBeaconsBySSIDAndFloorplanId(ssid, floorplanid), HttpStatus.OK);
    }

    @GetMapping("/getFloorplanByBeaconAndSSID/{beaconName}/{ssid}")
    public ResponseEntity<String> GetFloorplanNameByBeaconAndSSID(@PathVariable String beaconName, @PathVariable String ssid) {
        return new ResponseEntity<>(nodes.GetFloorplanIdByBeaconNameAndSSID(beaconName, ssid), HttpStatus.OK);
    }

    @GetMapping("/getPaths/{ssid}/{floorplan}")
    public ResponseEntity<Collection<Path>> GetPaths(@PathVariable String ssid, @PathVariable String floorplan) {
        nodes.GetPaths(ssid, floorplan).forEach(item -> {
            System.out.println(item.getName());
            System.out.println(item.getPath());
        });

        return new ResponseEntity<>(nodes.GetPaths(ssid, floorplan), HttpStatus.OK);
    }

    @PostMapping("/createPath")
    public ResponseEntity<HttpStatus> CreatePath(@RequestBody Path path) {
        nodes.CreatePath(path);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping ("/deletePath/{ssid}/{floorplan}/{pathName}")
    public ResponseEntity<HttpStatus> DeletePath(@PathVariable String ssid, @PathVariable String floorplan, @PathVariable String pathName) {
        nodes.DeletePath(ssid, floorplan, pathName);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getPathfinding/{ssid}/{floorplan}")
    public ResponseEntity<Path> GetPathfindingSolution(@PathVariable String ssid, @PathVariable String floorplan){
        nodes.GetPaths(ssid, floorplan).forEach(item -> {
            System.out.println(item.getName());
            System.out.println(item.getPath());
        });
        Collection<Path> allPaths = nodes.GetPaths(ssid, floorplan);

        if(allPaths.size() == 0) { return new ResponseEntity<>(null, HttpStatus.NOT_FOUND); }

        Collection<Node> nodesFound = nodes.GetNodesBySSIDAndFloorplanId(ssid,floorplan);

        //set all user counts as 3 for mock data
        nodesFound.forEach( node -> {
            node.setUserCount(3);
        });

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


        return new ResponseEntity<>(correctPath[0], HttpStatus.OK);
    }
}
