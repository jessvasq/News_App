package com.nvz.quick_news.repository;

import com.nvz.quick_news.entity.SavedArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedArticleRepository extends JpaRepository<SavedArticle, Long> {
    List<SavedArticle> findSavedArticlesByUser_UserId(Long userId);
    SavedArticle findSavedArticleById(Long id);
}
