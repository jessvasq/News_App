package com.nvz.quick_news.controller;

import com.nvz.quick_news.config.JwtService;
import com.nvz.quick_news.entity.SavedArticle;
import com.nvz.quick_news.service.SavedArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/articles")
public class ArticleController {
    private final JwtService jwtService;
    @Autowired
    private SavedArticleService articleService;

    public ArticleController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveArticle(@RequestBody SavedArticle article, @RequestHeader("Authorization") String token) {
        String username = jwtService.extractUsername(token.substring(7));
        articleService.saveArticle(username, article);
        return ResponseEntity.ok("Article saved successfully");
    }

    @GetMapping("/saved")
    public List<SavedArticle> getSavedArticles(@RequestHeader("Authorization") String token) {
        String username = jwtService.extractUsername(token.substring(7));
        System.out.println("Extracted Username: " + username);

        // Fetch saved articles based on the extracted username
        List<SavedArticle> savedArticles = articleService.getAllSavedArticles(username);
        System.out.println("Number of Saved Articles: " + savedArticles.size());

        // Log details of each article
        savedArticles.forEach(article -> System.out.println("Article Title: " + article.getTitle()));

        return savedArticles;
    }
}
