package com.nvz.quick_news.repository;

import com.nvz.quick_news.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> getArticleByAuthor_UserId(Long articleId);
    Article getArticleByArticleId(Long id);
}
