package com.example.backendjava.test;

import jakarta.annotation.Resource;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import java.util.concurrent.TimeUnit;

@Component
public class RedisConnectionTest {

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    public void testConnection() {
        Object connectionFactory = redisTemplate.getConnectionFactory();
        if (connectionFactory instanceof LettuceConnectionFactory) {
            LettuceConnectionFactory factory = (LettuceConnectionFactory) connectionFactory;
            System.out.println("RedisTemplate -> Host: " + factory.getHostName() +
                    ", Port: " + factory.getPort() +
                    ", DB: " + factory.getDatabase());
        }
        try {
            String pingResult = redisTemplate.getConnectionFactory().getConnection().ping();
            System.out.println("Redis ping结果: " + pingResult); // 正常应返回"PONG"

            String testKey = "test:connection:key";
            String testValue = "test_value_" + System.currentTimeMillis();

            redisTemplate.opsForValue().set(testKey, testValue, 60, TimeUnit.SECONDS);
            System.out.println("已设置测试值: " + testValue);

            String getValue = redisTemplate.opsForValue().get(testKey);
            System.out.println("读取测试值: " + getValue);

            if (testValue.equals(getValue)) {
                System.out.println("Redis连接和读写操作正常");
            } else {
                System.out.println("Redis读写不一致，可能存在问题");
            }

        } catch (Exception e) {
            System.err.println("Redis连接测试失败: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
