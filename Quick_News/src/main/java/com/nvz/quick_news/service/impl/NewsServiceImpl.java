package com.nvz.quick_news.service.impl;

import com.nvz.quick_news.service.NewsService;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

/**
 * Fetches data from the API
 */
@Service
public class NewsServiceImpl implements NewsService {

    private String apiKey = System.getenv("NEWSAPI_KEY");

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public String getTopHeadlines(String country) {
        String url = "https://newsapi.org/v2/top-headlines?country=" + country + "&apiKey=" + apiKey;
        return restTemplate.getForObject(url, String.class);
    }
}
