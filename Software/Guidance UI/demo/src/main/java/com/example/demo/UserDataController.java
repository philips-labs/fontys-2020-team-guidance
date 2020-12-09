package com.example.demo;

import Logic.Collection.UserDataCollection;
import Logic.Models.UserData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
public class UserDataController {

    UserDataCollection userDataCollection = new UserDataCollection();

    @GetMapping("/getUserDataByEmail/{email}")
    public ResponseEntity<UserData> GetUserDataByEmail(@PathVariable String email) {
        return new ResponseEntity<>(userDataCollection.GetUserDataByEmail(email), HttpStatus.OK);
    }


    @GetMapping("/getUserDatasByEmail/{email}")
    public ResponseEntity<Collection<UserData>> GetUserDatasByEmail(@PathVariable String email) {
        return new ResponseEntity<>(userDataCollection.GetUserDatasByEmail(email), HttpStatus.OK);
    }

    @PostMapping("/createUserData")
    public ResponseEntity<Collection<UserData>> AddUserData(@RequestBody UserData userData) {
        return new ResponseEntity<>(userDataCollection.AddUserData(userData), HttpStatus.OK);
    }

    @DeleteMapping("/deleteUserData/{email}")
    public ResponseEntity<Collection<UserData>> DeleteUserData(@PathVariable String email) {
        return new ResponseEntity<>(userDataCollection.DeleteUserData(email), HttpStatus.OK);
    }

}
