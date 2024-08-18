package com.nvz.quick_news.entity;

import com.nvz.quick_news.entity.enumClasses.ArticleStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table (name="article")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleId;
    @Column(length=100, nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private String authorId;
    private String categoryId;
    private LocalDateTime publishDate;
    private LocalDateTime updateDate;
    private String imageUrl;

    //status (draft, published, archived)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ArticleStatus status;

    // Relationships
    @ManyToOne
    @JoinColumn(name="userId", nullable=false, updatable=false)
    private User author;
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    private Category category;
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tag> tags;

}
