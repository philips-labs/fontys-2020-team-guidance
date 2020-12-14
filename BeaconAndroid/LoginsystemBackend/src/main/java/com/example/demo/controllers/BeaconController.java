package com.example.demo.controllers;

import javax.validation.Valid;

import com.example.demo.payload.response.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
                .orElseThrow(() -> new RuntimeException("<><><><><><><><><><><><>><><>"));
            bEntry.setEmail(bUpdateRequest.getEmail());
            bEntry.setLocation(bUpdateRequest.getLocation());
            bEntry.setAllBeacons(bUpdateRequest.getBeaconsStats());
            response = "UPDATED";
        }else{
            //Creating new beacon entry row
            bEntry = new BeaconEntry(bUpdateRequest.getEmail(),
                    bUpdateRequest.getLocation(),
                    bUpdateRequest.getBeaconsStats());
            response = "CREATED";
        }

        triangRepository.save(bEntry);
        //System.out.println(response);
        return ResponseEntity.ok(new MessageResponse("Successfully " + response + " a row with User Email: "
                + bUpdateRequest.getEmail()
                + " at / " + new Date() + " /"));
    }
    @PostMapping("/test")
    public ResponseEntity<?> test(@RequestBody BeaconEntryRequest bRequest){
        System.out.println("SUCCESSSSSSS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        System.out.println(bRequest.getEmail() + bRequest.getBeaconsStats() + " at: " + bRequest.getLocation());
        return ResponseEntity.ok(new MessageResponse("<<<<<<SUCCESS>>>>>>"));
    }

}
