package com.example.onetomany.controller;

import com.example.onetomany.entity.News;
import com.example.onetomany.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/news")
public class NewsController {
    private final NewsRepository newsRepository;

    @Autowired
    public NewsController(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    @GetMapping
    public ResponseEntity<List<News>> getAllHomes() {
        List<News> news = newsRepository.findAll();
        List<News> reversedList = new ArrayList<>(news.size());
        ListIterator<News> iterator = news.listIterator(news.size());
        while (iterator.hasPrevious()) {
            reversedList.add(iterator.previous());
        }
        return new ResponseEntity<>(reversedList, HttpStatus.OK);
    }
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<News> createNews(@RequestBody News news) {
        if(news.getId()!=null){
            News createdNews= newsRepository.findById(news.getId()).orElse(null);
            createdNews.setDescription(news.getDescription());
            createdNews.setContent(news.getContent());
            createdNews.setTitle(news.getTitle());
            createdNews.setDate(LocalDateTime.now());
            News updatedHomeEntity = newsRepository.save(createdNews);
            return ResponseEntity.ok(updatedHomeEntity);
        }
        else{

        news.setDate(LocalDateTime.now());
        News insertNews = newsRepository.save(news);
        return new ResponseEntity<>(insertNews, HttpStatus.CREATED);
        }
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<News> updateHome(@PathVariable Long id, @RequestBody News updatedHome) {
//        News existingHome = newsRepository.findById(id).orElse(null);
//        if (existingHome != null) {
//            existingHome.setTitle(updatedHome.getTitle());
//            existingHome.setContent(updatedHome.getContent());
//            existingHome.setDate(LocalDate.now());
//
//            News updatedHomeEntity = newsRepository.save(existingHome);
//            return ResponseEntity.ok(updatedHomeEntity);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        if (newsRepository.existsById(id)) {
            newsRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
