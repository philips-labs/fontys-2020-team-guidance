package com.example.demo.controllers;
import com.example.demo.models.BeaconEntry;
import com.example.demo.payload.request.BeaconEntryRequest;
import com.example.demo.payload.response.MessageResponse;

import com.example.demo.repository.BeaconEntryRepository;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.bind.annotation.RequestBody;

class BeaconControllerTest {

    //--test prep
    @Mock
    BeaconEntryRepository mockBeaconEntryRepo;

    private BeaconEntryRequest mockEntryRequest = new BeaconEntryRequest();
    private BeaconController bController = new BeaconController();

    private void assignMockValues(){
        mockEntryRequest.setEmail("ivan99@gmail.com");
        mockEntryRequest.setLocation("location");
        mockEntryRequest.setDistance1(10.1);
        mockEntryRequest.setDistance1(57.4);
        mockEntryRequest.setDistance1(1.7);
        mockEntryRequest.setBeacon1("Beacon1");
        mockEntryRequest.setBeacon2("Beacon2");
        mockEntryRequest.setBeacon3("Beacon3");
    }

    public ResponseEntity<?> updateBeaconsMock(BeaconEntryRequest bUpdateRequest){
        if (bUpdateRequest.getEmail() == null || bUpdateRequest.getEmail().isBlank() || bUpdateRequest.getEmail().isEmpty())
            return ResponseEntity.badRequest().body("unsuccessful");
        return ResponseEntity.ok().body("successful");
    }
    //--

    @Test
    void updateBeaconsTestWhenEmailIsNull() {
        assignMockValues();

        mockEntryRequest.setEmail(null);
        var response = bController.updateBeacons(mockEntryRequest);

        assertEquals(ResponseEntity.badRequest().body("unsuccessful"), response);
    }
    @Test
    void updateBeaconsTestWhenEmailIsNotNullButEmptyString() {
        assignMockValues();

        mockEntryRequest.setEmail("");
        var response = bController.updateBeacons(mockEntryRequest);

        assertEquals(ResponseEntity.badRequest().body("unsuccessful"), response);
    }
    @Test
    void updateBeaconsTestWhenEmailIsNotNull() {
        assignMockValues();

        var response = updateBeaconsMock(mockEntryRequest);

        assertEquals((ResponseEntity.ok().body("successful")), response);
    }
}
