package com.nvz.quick_news.controller;

import com.nvz.quick_news.entity.NewsArticle;
import com.nvz.quick_news.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
//    public List<NewsArticle> getNews(@RequestParam(value = "country", defaultValue = "us") String country) throws Exception {
//        return newsService.getTopHeadlines(country);
//    }

    @GetMapping("/news")
    public ResponseEntity<List<NewsArticle>> getTopHeadlines(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String source,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) throws Exception {

        Map<String, String> queryParams = new HashMap<>();
        if (country != null) {
            queryParams.put("country", country);
        }
        if (source != null) {
            queryParams.put("sources", source);
        }
        if (from != null) {
            queryParams.put("from", from.toString());
        }
        if (to != null) {
            queryParams.put("to", to.toString());
        }

        List<NewsArticle> newsList = newsService.getTopHeadlines(queryParams);
        return ResponseEntity.ok(newsList);
    }
}
