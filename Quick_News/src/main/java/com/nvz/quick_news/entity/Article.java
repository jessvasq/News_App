package com.nvz.quick_news.entity;

import com.nvz.quick_news.entity.enumClasses.ArticleStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @JoinColumn(name="user_id", nullable=false, updatable=false)
    private User author;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;

    @ManyToMany
    @JoinTable(
            name="tagging",
            joinColumns = @JoinColumn(name = "article_id"),
            inverseJoinColumns = @JoinColumn(name="tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;


}
