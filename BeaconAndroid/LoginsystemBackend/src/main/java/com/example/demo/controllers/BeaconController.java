package com.example.demo.controllers;

import javax.validation.Valid;

import com.example.demo.payload.response.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        //
        bUpdateRequest.setEmail("test@hotmail.com");
        Object[][] temp = new Object[3][2];
        temp[0][0] = "Beacon1";
        temp[0][1] = -50;
        temp[1][0] = "Beacon2";
        temp[1][1] = -75;
        temp[2][0] = "Beacon3";
        temp[2][1] = -20;
        bUpdateRequest.setBeaconsStats(temp);
        //
        if (triangRepository.existsLocationEntryByEmail(bUpdateRequest.getEmail())) {
            //Updating already existing beacon entry row
            bEntry = triangRepository.findBeaconEntryByEmail(bUpdateRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("<><><><><><><><><><><><>><><>"));
            bEntry.setUserEmail(bUpdateRequest.getEmail());
            bEntry.setAllBeacons(bUpdateRequest.getBeaconsStats());
            response = "UPDATED";
        }else{
            //Creating new beacon entry row
            bEntry = new BeaconEntry(bUpdateRequest.getEmail(), bUpdateRequest.getBeaconsStats());
            response = "CREATED";
        }

        triangRepository.save(bEntry);
        return ResponseEntity.ok(new MessageResponse("Successfully " + response + " a row with User Email: "
                + bUpdateRequest.getEmail()
                + " at / " + new Date() + " /"));
    }
    @PostMapping("/test")
    public Integer test(){
        System.out.println("SUCESSSSSSS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        return 1;
    }

}
