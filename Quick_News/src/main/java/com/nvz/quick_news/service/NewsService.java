package com.nvz.quick_news.service;

import org.springframework.stereotype.Component;

@Component
public interface NewsService {
    String getTopHeadlines(String country);
}
