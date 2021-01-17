package com.example.demo;

import com.example.demo.collection.UserDataCollection;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);

        //test("artsdylan@gmail.com");
    }

    private static void test(String email) {
        UserDataCollection userDataCollection = new UserDataCollection();
        String location = userDataCollection.getLocationByEmail(email);
        System.out.println(location);
    }
}
