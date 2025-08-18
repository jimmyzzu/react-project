package com.example.backendjava.controller;

import com.example.backendjava.dto.CategoryDistributionDto;
import com.example.backendjava.dto.TaskStatsDto;
import com.example.backendjava.entity.Task;
import com.example.backendjava.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<Task> list() {
        return service.list();
    }

    @PostMapping
    public Task create(@Valid @RequestBody Task task) {
        return service.create(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable Long id, @Valid @RequestBody Task task) {
        return service.update(id, task)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        boolean ok = service.delete(id);
        if (!ok) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Collections.singletonMap("success", true));
    }

    @GetMapping("/stats")
    public TaskStatsDto stats() { return service.stats(); }

    @GetMapping("/recent")
    public List<Task> recent(@RequestParam(defaultValue = "5") int limit) {
        return service.recent(limit);
    }

    @GetMapping("/categories")
    public List<CategoryDistributionDto> categories() { return service.categories(); }

    @GetMapping("/weekly-progress")
    public List<Integer> weeklyProgress() {
        return service.weeklyProgress();
    }
}


