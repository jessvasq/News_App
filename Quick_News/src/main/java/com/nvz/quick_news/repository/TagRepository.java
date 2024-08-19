package com.nvz.quick_news.repository;

import com.nvz.quick_news.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByName(String name);
    Tag findByTagId(Long tagId);
}
