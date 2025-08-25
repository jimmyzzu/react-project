package com.example.backendjava;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class BackendJavaApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendJavaApplication.class, args);
    }
}


