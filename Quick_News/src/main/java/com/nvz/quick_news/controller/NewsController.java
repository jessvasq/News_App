package com.nvz.quick_news.controller;

import com.nvz.quick_news.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Endpoint that react native can call
 */
@RestController
@CrossOrigin(origins = "http://localhost:8081")
public class NewsController {
    @Autowired
    private final NewsService newsService;

    @Autowired
    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping("/")
    public String getTopNews(@RequestParam String country){
        return newsService.getTopHeadlines(country);
    }
}
