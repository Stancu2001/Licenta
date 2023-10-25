package com.example.onetomany.controller;

import com.example.onetomany.entity.Home;
import com.example.onetomany.repository.HomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/homes")
public class HomeController {
    private final HomeRepository homeRepository;

    @Autowired
    public HomeController(HomeRepository homeRepository) {
        this.homeRepository = homeRepository;
    }

    @PostMapping
    public ResponseEntity<Home> createHome(@RequestBody Home home) {
        List<Home> homes = homeRepository.findAll();
        if(homes.size()!=0){
            Home home_entity=homes.get(0);
            home_entity.setTitle(home.getTitle());
            home_entity.setContent(home.getContent());
            Home createdHome = homeRepository.save(home_entity);
            return new ResponseEntity<>(createdHome, HttpStatus.CREATED);
        }
        else{
            Home createdHome = homeRepository.save(home);
            return new ResponseEntity<>(createdHome, HttpStatus.CREATED);
        }
    }

    @GetMapping()
    public ResponseEntity<List<Home>> getAllHomes() {
        List<Home> homes = homeRepository.findAll();
        return new ResponseEntity<>(homes, HttpStatus.OK);
    }

}
