package com.example.demo;

import Logic.Floorplan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class FloorplanController {

    Floorplan floorplan = new Floorplan();

    @GetMapping("/books/{ssid}")
    public ResponseEntity<String> getFloorplan(@PathVariable String ssid) {
        if(ssid.equals("test")) {
            return new ResponseEntity<>(floorplan.GetFloorplanFiles(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("null", HttpStatus.OK);
        }
    }

}
