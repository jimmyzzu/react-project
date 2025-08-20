package com.example.backendjava.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import static com.example.backendjava.config.KafkaTopics.TASK_EVENTS;

@Component
public class TaskEventConsumer {
    private static final Logger log = LoggerFactory.getLogger(TaskEventConsumer.class);

    @KafkaListener(topics = TASK_EVENTS, groupId = "task-app-group")
    public void onMessage(String message) {
        log.info("[Kafka] Received task event: {}", message);
    }
}


