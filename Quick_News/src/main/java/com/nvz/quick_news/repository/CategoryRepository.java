package com.nvz.quick_news.repository;

import com.nvz.quick_news.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findCategoriesByCategoryId(Long categoryId);
    Category findCategoryByCategoryId(Long categoryId);
}
