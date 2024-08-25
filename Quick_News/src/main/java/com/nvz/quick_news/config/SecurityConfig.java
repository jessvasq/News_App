package com.nvz.quick_news.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    } //uses BCrypt hashing function

    /**
     This method takes a 'HttpSecurity' object as a param and returns a 'SecurityFilterChain' which applies security to HTTP requests
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/news/**").permitAll() //anyone can access this endpoint
                        .anyRequest().authenticated() // all other requests can only be accessed by authenticated users
                );
        return http.build(); //builds the 'HttpSecurity' config and returns the 'securityFilterChain' object
    }

}


