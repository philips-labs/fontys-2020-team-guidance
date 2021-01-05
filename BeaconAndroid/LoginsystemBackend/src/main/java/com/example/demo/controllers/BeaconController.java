package com.example.demo.controllers;

import javax.validation.Valid;
import com.example.demo.payload.response.MessageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Date;

import com.example.demo.models.BeaconEntry;
import com.example.demo.payload.request.BeaconEntryRequest;
import com.example.demo.repository.BeaconEntryRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/beacon")
public class BeaconController {
    @Autowired
    BeaconEntryRepository triangRepository;
    BeaconEntry bEntry;
    String response;

    @PostMapping("/broadcast")
    public ResponseEntity<?> updateBeacons(@RequestBody BeaconEntryRequest bUpdateRequest){
        if (triangRepository.existsLocationEntryByEmail(bUpdateRequest.getEmail())) {
            //Updating already existing beacon entry row
            bEntry = triangRepository.findBeaconEntryByEmail(bUpdateRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("<><><><><><><><><><><><><><><>"));
            bEntry.setEmail(bUpdateRequest.getEmail());
            bEntry.setLocation(bUpdateRequest.getLocation());
            bEntry.setBeacon1(bUpdateRequest.getBeacon1());
            bEntry.setBeacon2(bUpdateRequest.getBeacon2());
            bEntry.setBeacon3(bUpdateRequest.getBeacon3());
            bEntry.setDistance1(bUpdateRequest.getDistance1());
            bEntry.setDistance2(bUpdateRequest.getDistance2());
            bEntry.setDistance3(bUpdateRequest.getDistance3());
            response = "UPDATED";
        }else{
            //Creating new beacon entry row
            bEntry = new BeaconEntry(
                    bUpdateRequest.getEmail(),
                    bUpdateRequest.getLocation(),
                    bUpdateRequest.getBeacon1(),
                    bUpdateRequest.getBeacon2(),
                    bUpdateRequest.getBeacon3(),
                    bUpdateRequest.getDistance1(),
                    bUpdateRequest.getDistance2(),
                    bUpdateRequest.getDistance3());
            response = "CREATED";
        }

        triangRepository.save(bEntry);
        //System.out.println(response);
        return ResponseEntity.ok(new MessageResponse("Successfully " + response + " a row with User Email: "
                + bUpdateRequest.getEmail()
                + " at / " + new Date() + " /"));
    }
    @GetMapping("/test")
    public void test(){
        System.out.println("SUCCESSFUL TEST");
    }
}
