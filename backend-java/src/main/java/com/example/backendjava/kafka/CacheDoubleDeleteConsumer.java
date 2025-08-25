package com.example.backendjava.kafka;

import com.example.backendjava.config.KafkaTopics;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

@Component
@EnableAsync
public class CacheDoubleDeleteConsumer {
    private static final Logger log = LoggerFactory.getLogger(CacheDoubleDeleteConsumer.class);
    private final StringRedisTemplate redisTemplate;

    public CacheDoubleDeleteConsumer(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @KafkaListener(topics = KafkaTopics.CACHE_DOUBLE_DELETE, groupId = "task-app-group")
    @Async
    public void onMessage(String key) {
        try {
            Thread.sleep(500L); // 简单的延迟删除
        } catch (InterruptedException ignored) {}
        try {
            redisTemplate.delete(key);
            log.info("[Cache] delayed double delete key={}", key);
        } catch (Exception e) {
            log.warn("[Cache] delayed delete failed key={} err={}", key, e.getMessage());
        }
    }
}


