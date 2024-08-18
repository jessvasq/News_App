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
@Table(name="comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    private String name;
    private LocalDateTime createdAt;

    // Relationships
    @ManyToOne
    @JoinColumn(name="userId", nullable=false)
    private User user;
    @ManyToOne
    @JoinColumn(name="articleId", nullable = false)
    private Article article;
}
