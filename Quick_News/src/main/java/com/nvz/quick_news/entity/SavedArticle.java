package com.nvz.quick_news.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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

    //A saved article is associated with a single "User" and a single "Article"
    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)//foreign key that link to the 'user' entity
    private User user;

    @ManyToOne
    @JoinColumn(name="article_id", nullable = false)//foreign key that link to the 'article' entity
    private Article article;

    private LocalDateTime created;

}
