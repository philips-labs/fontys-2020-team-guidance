package com.example.demo.security.jwt;

import java.io.IOException;
/*

import java.util.Date;
//-remove
*/
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/*
//-remove
import com.example.demo.controllers.BeaconController;
import com.example.demo.models.BeaconEntry;
import com.example.demo.payload.request.BeaconEntryRequest;
import com.example.demo.payload.response.MessageResponse;
import com.example.demo.repository.BeaconEntryRepository;

 */
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired; //-remove
import org.springframework.http.ResponseEntity; //-remove
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody; //-remove

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {
    /*
    //-remove below

    @Autowired
    BeaconEntryRepository beaconEntryRepository;
    BeaconEntry bEntry;
    String response;

    //-remove above
    */

    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    //Everytime an unauthenticated User requests a secured HTTP resource it will throw a AuthenticationException
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {

        /*
        //Denis's Test --> since it is not allowing unauth-ed user requests - remove below

        updateBeacons(new BeaconEntryRequest());

        // --- only for testing purposes - remove above
        */

        logger.error("Unauthorized error: {}", authException.getMessage());
        //HttpServletResponse.SC_UNAUTHORIZED = 401 status code
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized");
    }

    /*
    //TESTING METHOD - remove
    private ResponseEntity<?> updateBeacons(@RequestBody BeaconEntryRequest bUpdateRequest){
        //
        bUpdateRequest.setEmail("new@hotmail.com");
        Object[][] temp = new Object[3][2];
        temp[0][0] = "Beacon1";
        temp[0][1] = -50;
        temp[1][0] = "Beacon2";
        temp[1][1] = -75;
        temp[2][0] = "Beacon3";
        temp[2][1] = -20;
        bUpdateRequest.setBeaconsStats(temp);
        //
        if (beaconEntryRepository.existsLocationEntryByEmail(bUpdateRequest.getEmail())) {
            //Updating already existing beacon entry row
            bEntry = beaconEntryRepository.findBeaconEntryByEmail(bUpdateRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("<><><><><><><><><><><><>><><>"));
            bEntry.setUserEmail(bUpdateRequest.getEmail());
            bEntry.setAllBeacons(bUpdateRequest.getBeaconsStats());
            response = "UPDATED";
        }else{
            //Creating new beacon entry row
            bEntry = new BeaconEntry(bUpdateRequest.getEmail(), bUpdateRequest.getBeaconsStats());
            response = "CREATED";
        }

        beaconEntryRepository.save(bEntry);
        System.out.println("Successfully " + response + " a row with User Email: "
                + bUpdateRequest.getEmail()
                + " at / " + new Date() + " /");
        return ResponseEntity.ok(new MessageResponse("Successfully " + response + " a row with User Email: "
                + bUpdateRequest.getEmail()
                + " at / " + new Date() + " /"));
    }
    //-remove ABOVE
    */
}
