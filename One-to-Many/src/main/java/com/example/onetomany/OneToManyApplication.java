package com.example.onetomany;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.example.onetomany.entity")

public class OneToManyApplication {

    public static void main(String[] args) {
        SpringApplication.run(OneToManyApplication.class, args);
    }

}
