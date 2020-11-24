package com.example.demo;

import Logic.Collection.AdminKeyCollection;
import Logic.Collection.FloorplanCollection;
import Logic.Models.AdminKey;
import Logic.Models.Floorplan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("books")
public class FloorplanController {

    FloorplanCollection floorplans = new FloorplanCollection();
    AdminKeyCollection adminKeys = new AdminKeyCollection();

    //Get first floorplan of list sorted by SSID
    @GetMapping("{ssid}")
    public ResponseEntity<String> GetFloorplanBySSID(@PathVariable String ssid) {
        return new ResponseEntity<>(floorplans.GetFloorplanBySSID(ssid).getImage(), HttpStatus.OK);
    }

    //Check if admin key exists
    @GetMapping("/checkKey/{key}")
    public ResponseEntity<String> CheckAdminKey(@PathVariable String key) {
        return new ResponseEntity<>(adminKeys.GetAdminSSIDByKey(key), HttpStatus.OK);
    }

    //Get a floor plan list sorted by SSID
    @GetMapping("/getFloorplansBySSID/{ssid}")
    public ResponseEntity<Collection<Floorplan>> GetFloorplansBySSID(@PathVariable String ssid) {
        return new ResponseEntity<>(floorplans.GetFloorplansBySSID(ssid), HttpStatus.OK);
    }

    //Create a floorplan
    @PostMapping("/createFloorplan")
    public ResponseEntity<Collection<Floorplan>> AddFloorplan(@RequestBody Floorplan floorplan) {
        return new ResponseEntity<>(floorplans.AddFloorplan(floorplan), HttpStatus.OK);
    }

    //Delete a floorplan
    @DeleteMapping("/deleteFloorplan/{floorplanname}")
    public ResponseEntity<Collection<Floorplan>> DeleteFloorplan(@PathVariable String floorplanname) {
        return new ResponseEntity<>(floorplans.DeleteFloorplan(floorplanname), HttpStatus.OK);
    }

    //Check if super-admin key exists
    @GetMapping("/checkSuperAdmin/{key}")
    public ResponseEntity<Collection<AdminKey>> CheckSuperAdmin(@PathVariable String key) {
        return new ResponseEntity<>(adminKeys.CheckAdmin(key), HttpStatus.OK);
    }

    //Edit admin key
    @PutMapping("/editKey/{key}")
    public ResponseEntity<Collection<AdminKey>> EditAdminKey(@PathVariable String key, @RequestBody String newValue) {
        return new ResponseEntity<>(adminKeys.EditAdminKey(key, newValue), HttpStatus.OK);
    }

    //Edit ssid linked to admin key
    @PutMapping("/editSSID/{key}")
    public ResponseEntity<Collection<AdminKey>> EditSSID(@PathVariable String key, @RequestBody String newValue) {
        return new ResponseEntity<>(adminKeys.EditSSID(key, newValue), HttpStatus.OK);
    }

    //Delete admin key
    @DeleteMapping("/deleteKey/{key}")
    public ResponseEntity<Collection<AdminKey>> DeleteAdminKey(@PathVariable String key) {
        return new ResponseEntity<>(adminKeys.DeleteAdminKey(key), HttpStatus.OK);
    }

    //Create new Admin key
    @PostMapping("/addAdminKey")
    public ResponseEntity<Collection<AdminKey>> AddAdminKey(@RequestBody AdminKey adminKey) {
        return new ResponseEntity<>(adminKeys.AddAdminKey(adminKey), HttpStatus.OK);
    }

}
