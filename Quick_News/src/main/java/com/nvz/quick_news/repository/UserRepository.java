package com.nvz.quick_news.repository;

import com.nvz.quick_news.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByEmail(String email);
    User findUserByUsername(String username);
    User findUserByUserId(Long userId);
    List<User> findAllUsers();
}
