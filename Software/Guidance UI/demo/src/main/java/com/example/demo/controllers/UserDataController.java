package com.example.demo.controllers;

import com.example.demo.collection.UserDataCollection;
import com.example.demo.models.UserData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/userdata")
public class UserDataController {

    UserDataCollection userDataCollection = new UserDataCollection();

    @GetMapping("/getUserDataByEmail/{email}")
    public ResponseEntity<UserData> GetUserDataByEmail(@PathVariable String email) {
        return new ResponseEntity<>(userDataCollection.GetUserDataByEmail(email), HttpStatus.OK);
    }

    @GetMapping("/getUserLocationByEmail/{email}")
    public ResponseEntity<String> GetUserLocationByEmail(@PathVariable String email) {
        System.out.println(email);
        return new ResponseEntity<>(userDataCollection.getLocationByEmail(email), HttpStatus.OK);
    }

    @GetMapping("/getUserDatasByEmail/{email}")
    public ResponseEntity<UserData> GetUserDatasByEmail(@PathVariable String email) {
        return new ResponseEntity<>(userDataCollection.GetUserDataByEmail(email), HttpStatus.OK);
    }

    @PostMapping("/createUserData")
    public ResponseEntity<UserData> AddUserData(@RequestBody UserData userData) {
        return new ResponseEntity<>(userDataCollection.AddUserData(userData), HttpStatus.OK);
    }

    @DeleteMapping("/deleteUserData/{email}")
    public ResponseEntity<UserData> DeleteUserData(@PathVariable String email) {
        return new ResponseEntity<>(userDataCollection.DeleteUserData(email), HttpStatus.OK);
    }

    @GetMapping("/updateClosestNode/{nodeId}/{email}/{floorplanId}/{ssid}")
    public ResponseEntity<HttpStatus> UpdateClosestNode(@PathVariable int nodeId, @PathVariable String email, @PathVariable String floorplanId, @PathVariable String ssid) {
        userDataCollection.UpdateNodeCount(nodeId, email, floorplanId, ssid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
