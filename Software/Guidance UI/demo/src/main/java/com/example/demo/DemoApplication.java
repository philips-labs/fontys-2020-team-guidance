package com.example.demo;

import Logic.Collection.UserDataCollection;
import Logic.Models.UserData;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);

        test("yessin1996@hotmail.com");
    }

    private static void test(String email) {
        UserDataCollection userDataCollection = new UserDataCollection();
        String location = userDataCollection.getLocationByEmail(email);
    }
}
