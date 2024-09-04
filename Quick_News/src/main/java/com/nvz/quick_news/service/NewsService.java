package com.nvz.quick_news.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nvz.quick_news.entity.NewsArticle;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Fetches data from the API
 */
@Service
public class NewsService {
    private final String apiKey= "******";

    public List<NewsArticle> getTopHeadlines(Map<String, String> queryParams) throws Exception {
        //Utility class for making HTTP requests and handling responses
        RestTemplate restTemplate = new RestTemplate();

        List<NewsArticle> newsList = new ArrayList<>();

        StringBuilder getUrl = new StringBuilder("https://newsapi.org/v2/top-headlines?");

        queryParams.forEach((key, value) -> getUrl.append(key).append("=").append(value).append("&"));

        getUrl.append("apiKey=").append(apiKey);

        //setting HTTPHeaders
        HttpHeaders headers = new HttpHeaders();
        //set to application json to indicate that the response will be in JSON format
        headers.setContentType(MediaType.APPLICATION_JSON);
        //request entity including headers
        HttpEntity<String> entity = new HttpEntity<>(headers);
        //exchange is used to send HTTP GET request to the URL and receive the response
        //ResponseEntity catches the responses
        ResponseEntity<String> response = restTemplate.exchange(getUrl.toString(), HttpMethod.GET, entity, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            ObjectMapper mapper = new ObjectMapper(); //Jackson utility to parse JSON strings into Java Objects
            //JsonNode represents the root node of the JSON response
            JsonNode rootNode = mapper.readTree(response.getBody());

            //check if the root array has an "articles" array
            if (rootNode.has("articles")) {
                JsonNode articlesArray = rootNode.get("articles");
                //Iterating through articles
                for (JsonNode jsonNode : articlesArray) {
                    //create a new 'NewsArticle' object and populate with fetched data for each article
                    NewsArticle news = new NewsArticle();
                    news.setTitle(jsonNode.path("title").asText("No Title"));
                    news.setAuthor(jsonNode.path("author").asText("No Author"));
                    news.setUrl(jsonNode.path("url").asText("No Url"));
                    news.setContent(jsonNode.path("content").asText("No Content"));
                    news.setUrlToImage(jsonNode.path("urlToImage").asText("No UrlToImage"));
                    news.setDescription(jsonNode.path("description").asText("No Description"));
                    news.setSource(jsonNode.path("source").path("name").asText("No Source"));
                    newsList.add(news);
                }
            } else {
                //if there's an error, throw a message with the entire JSON response
                throw new Exception(rootNode.toString());
            }
        }
        //return the list of 'NewsArticle' containing the parsed  articles
        return newsList;
    }
}
