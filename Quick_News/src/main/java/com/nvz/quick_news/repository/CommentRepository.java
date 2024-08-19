package com.nvz.quick_news.repository;

import com.nvz.quick_news.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> getCommentsByUser_UserId(Long userId);
    Comment getCommentByCommentId(Long id);
}
