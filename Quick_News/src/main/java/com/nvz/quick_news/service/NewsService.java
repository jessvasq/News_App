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
//    private final String apiKey= "******";
    private final String apiKey= "37b5802ab29843719237cfefe440a3a8";
    private String BASE_URL = "https://newsapi.org/v2/top-headlines";

    public List<NewsArticle> getTopHeadlines(Map<String, String> queryParams) throws Exception {
        //Utility class for making HTTP requests and handling responses
        RestTemplate restTemplate = new RestTemplate();

        List<NewsArticle> newsList = new ArrayList<>();

        StringBuilder getUrl = new StringBuilder("https://newsapi.org/v2/top-headlines?");

        queryParams.forEach((key, value) -> getUrl.append(key).append("=").append(value).append("&"));

        getUrl.append("&from=2024-09-10&to=2024-09-12-&sortBy=popularity&apiKey=").append(apiKey);

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
//
//
//    public List<NewsArticle> getArticlesByCountry(String country) throws Exception {
//        RestTemplate restTemplate = new RestTemplate();
//        List<NewsArticle> newsList = new ArrayList<>();
//        StringBuilder getUrl = new StringBuilder("https://newsapi.org/v2/top-headlines?country=");
//        getUrl.append(country);
//        getUrl.append("&from=2024-04-01&to=2024-08-01&sortBy=popularity&apiKey=").append(apiKey);
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<String> entity = new HttpEntity<>(headers);
//        ResponseEntity<String> response = restTemplate.exchange(getUrl.toString(), HttpMethod.GET, entity, String.class);
//        if (response.getStatusCode() == HttpStatus.OK) {
//            ObjectMapper mapper = new ObjectMapper();
//            JsonNode rootNode = mapper.readTree(response.getBody());
//            if (rootNode.has("articles")) {
//                JsonNode articlesArray = rootNode.get("articles");
//                for (JsonNode jsonNode : articlesArray) {
//                    NewsArticle news = new NewsArticle();
//                    news.setTitle(jsonNode.path("title").asText("No Title"));
//                    news.setAuthor(jsonNode.path("author").asText("No Author"));
//                    news.setUrl(jsonNode.path("url").asText("No Url"));
//                    news.setContent(jsonNode.path("content").asText("No Content"));
//                    newsList.add(news);
//                }
//            } else {
//                throw new Exception(rootNode.toString());
//            }
//        }
//        return newsList;
//    }
//
//    public List<NewsArticle> getArticlesByCategory(String category) throws Exception {
//        RestTemplate restTemplate = new RestTemplate();
//        List<NewsArticle> newsList = new ArrayList<>();
//        StringBuilder getUrl = new StringBuilder("https://newsapi.org/v2/top-headlines?category=");
//        getUrl.append(category);
//        getUrl.append("&from=2024-08-01&to=2024-08-01&sortBy=popularity&apiKey=").append(apiKey);
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<String> entity = new HttpEntity<>(headers);
//        ResponseEntity<String> response = restTemplate.exchange(getUrl.toString(), HttpMethod.GET, entity, String.class);
//        if (response.getStatusCode() == HttpStatus.OK) {
//            ObjectMapper mapper = new ObjectMapper();
//            JsonNode rootNode = mapper.readTree(response.getBody());
//            if (rootNode.has("articles")) {
//                JsonNode articlesArray = rootNode.get("articles");
//                for (JsonNode jsonNode : articlesArray) {
//                    NewsArticle news = new NewsArticle();
//                    news.setTitle(jsonNode.path("title").asText("No Title"));
//                    news.setAuthor(jsonNode.path("author").asText("No Author"));
//                    news.setUrl(jsonNode.path("url").asText("No Url"));
//                    news.setContent(jsonNode.path("content").asText("No Content"));
//                    newsList.add(news);
//                }
//            } else {
//                throw new Exception(rootNode.toString());
//            }
//        }
//        return newsList;
//    }

//    public List<NewsArticle> searchArticles(String tag) throws Exception {
//        RestTemplate restTemplate = new RestTemplate();
//        List<NewsArticle> newsList = new ArrayList<>();
//        StringBuilder getUrl = new StringBuilder("https://newsapi.org/v2/everything?q=");
//        getUrl.append(tag);
//        getUrl.append("&apiKey=").append(apiKey);
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<String> entity = new HttpEntity<>(headers);
//        ResponseEntity<String> response = restTemplate.exchange(getUrl.toString(), HttpMethod.GET, entity, String.class);
//        if (response.getStatusCode() == HttpStatus.OK) {
//            ObjectMapper mapper = new ObjectMapper();
//            JsonNode rootNode = mapper.readTree(response.getBody());
//            if (rootNode.has("articles")) {
//                JsonNode articlesArray = rootNode.get("articles");
//                for (JsonNode jsonNode : articlesArray) {
//                    NewsArticle news = new NewsArticle();
//                    news.setTitle(jsonNode.path("title").asText("No Title"));
//                    news.setAuthor(jsonNode.path("author").asText("No Author"));
//                    news.setUrl(jsonNode.path("url").asText("No Url"));
//                    news.setContent(jsonNode.path("content").asText("No Content"));
//                    newsList.add(news);
//                }
//            } else {
//                throw new Exception(rootNode.toString());
//            }
//        }
//        return newsList;
//    }

    // Get articles where category == sport
    public List<NewsArticle> getSportsHeadlines() throws Exception {
        String url = BASE_URL + "?category=sports&from=2024-09-10&to=2024-09-12&sortBy=popularity&apiKey=" + apiKey;
        return fetchArticles(url);
    }

    // Generalized method to fetch articles from the given URL
    private List<NewsArticle> fetchArticles(String url) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        List<NewsArticle> newsList = new ArrayList<>();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response.getBody());

            if (rootNode.has("articles")) {
                JsonNode articlesArray = rootNode.get("articles");
                for (JsonNode jsonNode : articlesArray) {
                    NewsArticle news = parseArticle(jsonNode);
                    newsList.add(news);
                }
            } else {
                throw new Exception(rootNode.toString());
            }
        }
        return newsList;
    }

    // Helper method to parse a JSON node into a NewsArticle object
    private NewsArticle parseArticle(JsonNode jsonNode) {
        NewsArticle news = new NewsArticle();
        news.setTitle(jsonNode.path("title").asText("No Title"));
        news.setAuthor(jsonNode.path("author").asText("No Author"));
        news.setUrl(jsonNode.path("url").asText("No Url"));
        news.setContent(jsonNode.path("content").asText("No Content"));
        news.setUrlToImage(jsonNode.path("urlToImage").asText("No UrlToImage"));
        news.setDescription(jsonNode.path("description").asText("No Description"));
        news.setSource(jsonNode.path("source").path("name").asText("No Source"));
        return news;
    }

    // Get articles by category
    public List<NewsArticle> getArticlesByCategory(String category) throws Exception {
        String url = BASE_URL + "?category=" + category + "&from=2024-09-10&to=2024-09-12&sortBy=popularity&apiKey=" + apiKey;
        return fetchArticles(url);
    }

    // Get articles by location
    public List<NewsArticle> getArticlesByLocation(String country) throws Exception {
        String url = BASE_URL + "?country=" + country + "&from=2024-09-10&to=2024-09-12&sortBy=popularity&apiKey=" + apiKey;
        return fetchArticles(url);
    }

    public List<NewsArticle> getArticlesBySearchQuery(String query) throws Exception {
        String url = "https://newsapi.org/v2/everything?q=" + query + "&from=2024-09-10&to=2024-09-12&sortBy=popularity&apiKey=" + apiKey;
        return fetchArticles(url);
    }

}
