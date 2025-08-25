package com.example.backendjava.service;

import com.example.backendjava.dto.CategoryDistributionDto;
import com.example.backendjava.test.RedisConnectionTest;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import static com.example.backendjava.config.CacheKeys.CATEGORIES_DISTRIBUTION;
import static com.example.backendjava.kafka.Topics.CACHE_DOUBLE_DELETE;
import com.example.backendjava.dto.TaskStatsDto;
import com.example.backendjava.entity.Task;
import com.example.backendjava.repository.TaskRepository;
import com.example.backendjava.repository.projection.WeeklyProgressProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Slf4j
@Service
public class TaskService {
    private final TaskRepository repository;
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    RedisConnectionTest redisConnectionTest;

    public TaskService(TaskRepository repository,
                       StringRedisTemplate redisTemplate,
                       ObjectMapper objectMapper,
                       KafkaTemplate<String, String> kafkaTemplate) {
        this.repository = repository;
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
        this.kafkaTemplate = kafkaTemplate;
    }

    public List<Task> list() {
        return repository.findAll();
    }

    public Page<Task> pageAll(int pageNo, int pageSize) {
        return repository.findAll(PageRequest.of(Math.max(pageNo - 1, 0), pageSize,
                Sort.by(Sort.Order.desc("updatedAt"), Sort.Order.desc("createdAt"))));
    }

    public long countAll() {
        return repository.count();
    }

    public List<Task> listByOwnerApproved(String owner) {
        return repository.findByOwnerAndReviewStatus(owner, "approved");
    }

    public List<Task> listByReviewStatus(String reviewStatus) {
        return repository.findByReviewStatus(reviewStatus);
    }

    public List<Task> listForReviewerQueue() {
        return repository.findByReviewStatusIn(List.of("submitted", "processing"));
    }

    public Page<Task> pageReviewerByReviewStatus(String reviewStatus, int pageNo, int pageSize) {
        return repository.findByReviewStatus(reviewStatus, PageRequest.of(Math.max(pageNo - 1, 0), pageSize));
    }

    public long countByReviewStatus(String reviewStatus) {
        return repository.countByReviewStatus(reviewStatus);
    }

    public Task create(Task task) {
        task.setId(null);
        if (task.getOwner() == null) task.setOwner("");
        task.setReviewStatus("submitted");
        return repository.save(task);
    }

    public Optional<Task> update(Long id, Task task) {
        return repository.findById(id).map(existing -> {
            existing.setTitle(task.getTitle());
            existing.setDescription(task.getDescription());
            existing.setStatus(task.getStatus());
            existing.setPriority(task.getPriority());
            existing.setCategory(task.getCategory());
            existing.setCompletedAt(task.getCompletedAt());
            existing.setDueDate(task.getDueDate());
            return repository.save(existing);
        });
    }

    public boolean delete(Long id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        try {
            redisTemplate.delete(CATEGORIES_DISTRIBUTION);
            kafkaTemplate.send(CACHE_DOUBLE_DELETE, CATEGORIES_DISTRIBUTION);
        } catch (Exception ignored) {}
        return true;
    }

    public TaskStatsDto stats() {
        long total = repository.count();
        long completed = repository.countByStatus("completed");
        long pending = repository.countByStatus("pending");
        long overdue = repository.countByStatus("overdue");
        return new TaskStatsDto(total, completed, pending, overdue);
    }

    public List<Task> recent(int limit) {
        return repository.findRecent(PageRequest.of(0, Math.max(1, limit)));
    }

    public List<CategoryDistributionDto> categories() {
        redisConnectionTest.testConnection();
        try {
            String cached = redisTemplate.opsForValue().get(CATEGORIES_DISTRIBUTION);
            if (cached != null && !cached.isBlank()) {
                return objectMapper.readValue(cached, new TypeReference<List<CategoryDistributionDto>>(){});
            }
        } catch (Exception ignored) {}

        List<CategoryDistributionDto> rows = repository.groupByCategory();
        long totalCount = rows.stream().mapToLong(CategoryDistributionDto::getCount).sum();
        rows.forEach(r -> {
            if (r.getCount() == 0) r.setValue(0);
            else r.setValue((int) Math.round(r.getCount() * 100.0 / totalCount));
        });
        try {
            redisTemplate.opsForValue().set(CATEGORIES_DISTRIBUTION, objectMapper.writeValueAsString(rows));
        } catch (Exception ignored) {}
        return rows;
    }

    public List<Integer> weeklyProgress() {
        LocalDate since = LocalDate.now().minusDays(6);
        List<WeeklyProgressProjection> rows = repository.weeklyProgress(since);
        Map<LocalDate, int[]> map = new HashMap<>();
        for (WeeklyProgressProjection r : rows) {
            LocalDate d = r.getDate();
            int total = r.getTotal();
            int comp = r.getCompleted();
            map.put(d, new int[]{total, comp});
        }
        List<Integer> result = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            LocalDate d = LocalDate.now().minusDays(i);
            int[] v = map.get(d);
            if (v == null || v[0] == 0) result.add(0);
            else result.add((int) Math.round(v[1] * 100.0 / v[0]));
        }
        return result;
    }
}


