package com.example.demo;

import Logic.Collection.AdminKeyCollection;
import Logic.Collection.FloorplanCollection;
import Logic.Collection.NodeCollection;
import Logic.Models.AdminKey;
import Logic.Models.Floorplan;
import Logic.Models.IBeacon;
import Logic.Models.Node;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("books")
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
    public ResponseEntity<String> GetFloorplanByBeaconAndSSID(@PathVariable String beaconName, @PathVariable String ssid) {
        return new ResponseEntity<>(floorplans.GetFloorplanByNameAndSSID(nodes.GetFloorplanIdByBeaconNameAndSSID(beaconName, ssid), ssid).getImage(), HttpStatus.OK);
    }

}
