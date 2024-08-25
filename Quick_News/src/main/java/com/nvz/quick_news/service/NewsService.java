package com.nvz.quick_news.service.impl;

import com.nvz.quick_news.service.NewsService;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * Fetches data from the API
 */
@Service
public class NewsServiceImpl implements NewsService {

    private String apiKey = System.getenv("NEWSAPI_KEY");
    private static final String NEWS_API_URL = "https://newsapi.org/v2/top-headlines";

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public String getTopHeadlines(String country) {
        String url = UriComponentsBuilder.fromHttpUrl(NEWS_API_URL)
                .queryParam("country", country)
                .queryParam("apiKey", apiKey)
                .toUriString();

        return restTemplate.getForObject(url, String.class);
    }
}
