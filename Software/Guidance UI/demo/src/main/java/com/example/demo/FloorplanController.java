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

    @GetMapping("{ssid}")
    public ResponseEntity<String> GetFloorplanBySSID(@PathVariable String ssid) {
        return new ResponseEntity<>(floorplans.GetFloorplanBySSID(ssid).getImage(), HttpStatus.OK);
    }

    @GetMapping("/checkKey/{key}")
    public ResponseEntity<String> CheckAdminKey(@PathVariable String key) {
        return new ResponseEntity<>(adminKeys.GetAdminSSIDByKey(key), HttpStatus.OK);
    }

    @GetMapping("/getFloorplansBySSID/{ssid}")
    public ResponseEntity<Collection<Floorplan>> GetFloorplansBySSID(@PathVariable String ssid) {
        return new ResponseEntity<>(floorplans.GetFloorplansBySSID(ssid), HttpStatus.OK);
    }

    @PostMapping("/createFloorplan")
    public ResponseEntity<Collection<Floorplan>> AddFloorplan(@RequestBody Floorplan floorplan) {
        return new ResponseEntity<>(floorplans.AddFloorplan(floorplan), HttpStatus.OK);
    }

    @DeleteMapping("/deleteFloorplan/{floorplanname}")
    public ResponseEntity<Collection<Floorplan>> DeleteFloorplan(@PathVariable String floorplanname) {
        return new ResponseEntity<>(floorplans.DeleteFloorplan(floorplanname), HttpStatus.OK);
    }

    @GetMapping("/checkSuperAdmin/{key}")
    public ResponseEntity<Collection<AdminKey>> CheckSuperAdmin(@PathVariable String key) {
        return new ResponseEntity<>(adminKeys.CheckAdmin(key), HttpStatus.OK);
    }

    @PutMapping("/editKey/{key}")
    public ResponseEntity<Collection<AdminKey>> EditAdminKey(@PathVariable String key, @RequestBody String newValue) {
        return new ResponseEntity<>(adminKeys.EditAdminKey(key, newValue), HttpStatus.OK);
    }

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

}