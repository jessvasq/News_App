package com.nvz.quick_news.service;
import com.nvz.quick_news.entity.SavedArticle;

import java.util.List;

public interface SavedArticleService {
    void saveArticle(String username, SavedArticle savedArticle);
    List<SavedArticle> getAllSavedArticles(String username);
}
