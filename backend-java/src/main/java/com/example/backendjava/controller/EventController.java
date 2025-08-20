package com.example.backendjava.controller;

import com.example.backendjava.kafka.TaskEventProducer;
import com.example.backendjava.dto.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {
    private final TaskEventProducer producer;

    public EventController(TaskEventProducer producer) {
        this.producer = producer;
    }

    @PostMapping("/task")
    public ResponseEntity<ResponseDto<Map<String, Object>>> sendTaskEvent(@RequestBody Map<String, Object> payload) {
        producer.send(payload);
        return ResponseEntity.ok(ResponseDto.success(Map.of("success", true), "已发送"));
    }
}


