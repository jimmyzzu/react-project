package com.example.backendjava.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import static com.example.backendjava.config.KafkaTopics.TASK_EVENTS;

@Component
public class TaskEventProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public TaskEventProducer(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void send(Object payload) {
        try {
            String json = (payload instanceof String) ? (String) payload : objectMapper.writeValueAsString(payload);
            kafkaTemplate.send(TASK_EVENTS, json);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}


