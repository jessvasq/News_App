package com.nvz.quick_news.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="tag")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    //Relationships
   @ManyToMany(mappedBy = "tags")
    private Set<Article> articles = new HashSet<>();
}
