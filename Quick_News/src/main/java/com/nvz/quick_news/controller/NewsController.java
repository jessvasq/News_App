package com.nvz.quick_news.controller;

import com.nvz.quick_news.entity.NewsArticle;
import com.nvz.quick_news.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Endpoint that react native can call
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class NewsController {
    @Autowired
    private final NewsService newsService;

    @Autowired
    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

//    @GetMapping("/news")
//    public String getNews(@RequestParam(value = "country", defaultValue = "us") String country) {
//        return newsService.getTopHeadlines(country);
//    }



}
