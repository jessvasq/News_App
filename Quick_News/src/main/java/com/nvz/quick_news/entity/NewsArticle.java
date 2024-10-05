package com.nvz.quick_news.entity;
import lombok.*;

/**
API MODEL - data structure returned by the News API
 **/
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NewsArticle {
    private String source;
    private String author;
    private String title;
    private String description;
    private String url;
    private String urlToImage;
    private String publishedAt;
    private String content;
}
