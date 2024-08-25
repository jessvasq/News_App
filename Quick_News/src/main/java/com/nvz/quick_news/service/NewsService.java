package com.nvz.quick_news.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.beans.factory.annotation.Value;

/**
 * Fetches data from the API
 */
@Service
public class NewsService {

   // private String apiKey = System.getenv("NEWSAPI_KEY");
   @Value("${newsapi.apiKey}")
   private String apiKey;

    private static final String NEWS_API_URL = "https://newsapi.org/v2/top-headlines";


    public String getTopHeadlines(String country) {
        RestTemplate restTemplate = new RestTemplate();

        String url = UriComponentsBuilder.fromHttpUrl(NEWS_API_URL)
                .queryParam("country", country)
                .queryParam("apiKey", apiKey)
                .toUriString();

        return restTemplate.getForObject(url, String.class);
    }
}
