package com.example.demo;

import Logic.Collection.AdminKeyCollection;
import Logic.Collection.FloorplanCollection;
import Logic.Models.Floorplan;
import com.fasterxml.jackson.databind.JsonNode;
import netscape.javascript.JSObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("books")
public class FloorplanController {

    FloorplanCollection floorplans = new FloorplanCollection();
    AdminKeyCollection adminKeys = new AdminKeyCollection();

    @GetMapping("{ssid}")
    public ResponseEntity<String> GetFloorplanBySSID(@PathVariable String ssid) {
        return new ResponseEntity<>(floorplans.GetFloorplanBySSID(ssid).getLink(), HttpStatus.OK);
    }

    @GetMapping("/checkKey/{key}")
    public ResponseEntity<String> CheckAdminKey(@PathVariable String key) {
        return new ResponseEntity<>(adminKeys.GetAdminSSIDByKey(key), HttpStatus.OK);
    }

    @GetMapping("/getFloorplansBySSID/{ssid}")
    public ResponseEntity<Collection<Floorplan>> GetFloorplansBySSID(@PathVariable String ssid) {
        return new ResponseEntity<>(floorplans.GetFloorplansBySSID(ssid), HttpStatus.OK);
    }

    @PostMapping("/addFloorplan")
    public ResponseEntity<Collection<Floorplan>> AddFloorplan(@RequestBody Floorplan floorplan) {
        return new ResponseEntity<>(floorplans.AddFloorplan(floorplan), HttpStatus.OK);
    }

    @DeleteMapping("/deleteFloorplan/{floorplanname}")
    public ResponseEntity<Collection<Floorplan>> DeleteFloorplans(@PathVariable String floorplanname) {
        return new ResponseEntity<>(floorplans.DeleteFloorplans(floorplanname), HttpStatus.OK);
    }

}
