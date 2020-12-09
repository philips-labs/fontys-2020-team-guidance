package com.example.demo;

import Logic.Collection.UserDataCollection;
import Logic.Models.UserData;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);

        UserData userData = new UserData();
        UserDataCollection userDataCollection = new UserDataCollection();
        test(userData, userDataCollection);
    }

    private static void test(UserData userData, UserDataCollection userDataCollection) {
//        String testString = "";
//        testString = userData.getCoordinates(1d, 2d, 3d);
        userData.setEmail("yessin1996@hotmail.com");
        userData.setDistance1(1.00);
        userData.setDistance2(1.00);
        userData.setDistance3(1.00);
        userData.setLocation("location");
        userDataCollection.AddUserData(userData);
    }
}
