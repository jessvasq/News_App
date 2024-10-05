package com.nvz.quick_news.controller;

import com.nvz.quick_news.entity.NewsArticle;
import com.nvz.quick_news.entity.SavedArticle;
import com.nvz.quick_news.repository.SavedArticleRepository;
import com.nvz.quick_news.service.NewsService;
import com.nvz.quick_news.service.SavedArticleService;
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
    private final SavedArticleService articleService;

    @Autowired
    public NewsController(NewsService newsService, SavedArticleService articleService) {
        this.newsService = newsService;
        this.articleService = articleService;
    }

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


    // Endpoint to get articles by country
    @GetMapping("/country/{country}")
    public List<NewsArticle> getArticlesByCountry(@PathVariable String country) throws Exception {
        return newsService.getArticlesByLocation(country);
    }

    // Endpoint to get articles by category
    @GetMapping("/category/{category}")
    public List<NewsArticle> getArticlesByCategory(@PathVariable String category) throws Exception {


        return newsService.getArticlesByCategory(category);
    }

    // Endpoint to get articles by search query
    @GetMapping("/search")
    public List<NewsArticle> searchArticles(@RequestParam String query) throws Exception {
        return newsService.getArticlesBySearchQuery(query);
    }

    @GetMapping("/sports")
    public List<NewsArticle> getSportsHeadlines() throws Exception {
        return newsService.getSportsHeadlines();
    }


//
//    @PostMapping("/saveArticle")
//    public ResponseEntity<String> saveArticle(@RequestBody NewsArticle apiArticle) {
//        // Create a new Article instance
//        SavedArticle article = new SavedArticle();
//        article.setTitle(apiArticle.getTitle());
//        article.setAuthor(apiArticle.getAuthor());
//        article.setUrl(apiArticle.getUrl());
//        article.setContent(apiArticle.getContent());
//        article.setUrlToImage(apiArticle.getUrlToImage());
//        article.setDescription(apiArticle.getDescription());
//        article.setSource(apiArticle.getSource());
//
//        articleService.saveArticle(article);
//
//        return ResponseEntity.ok("Article saved successfully");
//    }

}
