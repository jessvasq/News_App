package com.nvz.quick_news.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Article to be stored in the database
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="savedArticle")
public class SavedArticle {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String source;
    private String author;
    private String title;
    private String description;
    private String url;
    private String urlToImage;
    private String publishedAt;
    private String content;

    // Relationship to the user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable=false)
    private User user;

    private LocalDateTime created;

}
