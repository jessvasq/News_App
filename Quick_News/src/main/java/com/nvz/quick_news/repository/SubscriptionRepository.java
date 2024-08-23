package com.nvz.quick_news.repository;

import com.nvz.quick_news.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
//    Subscription getBySubscriptionId(Long id);
//    List<Subscription> getSubscriptions();
}
