package com.nvz.quick_news.service.impl;

import com.nvz.quick_news.entity.SavedArticle;
import com.nvz.quick_news.entity.User;
import com.nvz.quick_news.repository.SavedArticleRepository;
import com.nvz.quick_news.repository.UserRepository;
import com.nvz.quick_news.service.SavedArticleService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SavedArticleImpl implements SavedArticleService {
    @Autowired
    private SavedArticleRepository savedArticleRepository;

    @Autowired
    private SavedArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Save the article for a specific user.
     *
     * @param username The username of the user.
     * @param article  The article to be saved.
     */
    public void saveArticle(String username, SavedArticle article) {
        Optional<User> userOptional = userRepository.findByEmail(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Check if the article already exists for the user
            boolean articleExists = user.getSavedArticles().stream()
                    .anyMatch(existingArticle -> existingArticle.getTitle().equals(article.getTitle()));

            if (!articleExists) {
                article.setUser(user);
                articleRepository.save(article);
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    /**
     * Retrieve saved articles for a specific user.
     *
     * @param username The username of the user.
     * @return A list of saved articles.
     */
    public List<SavedArticle> getAllSavedArticles(String username) {
        Optional<User> userOptional = userRepository.findByEmail(username);
        if (userOptional.isPresent()) {
            List<SavedArticle> articles = userOptional.get().getSavedArticles();
            System.out.println("Number of saved articles: " + articles.size());
            articles.forEach(article -> System.out.println("Article: " + article.getTitle()));
            return articles;
        } else {
            throw new RuntimeException("User not found");
        }
    }

}
