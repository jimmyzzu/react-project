package com.example.backendjava.controller;

import com.example.backendjava.dto.CategoryDistributionDto;
import com.example.backendjava.dto.PageResDto;
import com.example.backendjava.dto.ResponseDto;
import com.example.backendjava.dto.TaskRequestDto;
import com.example.backendjava.dto.TaskStatsDto;
import com.example.backendjava.entity.Task;
import com.example.backendjava.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseDto<PageResDto<Task>> getByPage(@RequestParam(required = false, name = "pageNo") Integer pageNo,
                                              @RequestParam(required = false, name = "pageSize") Integer pageSize) {
        int pn = (pageNo == null || pageNo < 1) ? 1 : pageNo;
        int ps = (pageSize == null || pageSize < 1) ? 5 : pageSize;
        Page<Task> page = taskService.pageAll(pn, ps);
        long total = taskService.countAll();
        PageResDto<Task> pageDto = new PageResDto<>(page.getContent(), total, pn, ps);
        return ResponseDto.success(pageDto);
    }

    @PostMapping("/query")
    public ResponseDto<PageResDto<Task>> query(@RequestBody TaskRequestDto req) {
        String role = req.getRole();
        String status = req.getStatus();
        Integer pageNo = req.getPageNo();
        Integer pageSize = req.getPageSize();

        if ("reviewer".equalsIgnoreCase(role)) {
            String reviewStatus = (status == null || status.isBlank()) ? "processing" : status;
            int pn = (pageNo == null || pageNo < 1) ? 1 : pageNo;
            int ps = (pageSize == null || pageSize < 1) ? 5 : pageSize;
            Page<Task> page = taskService.pageReviewerByReviewStatus(reviewStatus, pn, ps);
            long total = taskService.countByReviewStatus(reviewStatus);
            PageResDto<Task> pageDto = new PageResDto<>(null, total, pn, ps);
            pageDto.setItems(page.getContent());
            return ResponseDto.success(pageDto);
        }
        // 非 reviewer 返回空分页
        int pn = (pageNo == null || pageNo < 1) ? 1 : pageNo;
        int ps = (pageSize == null || pageSize < 1) ? 5 : pageSize;
        return ResponseDto.success(new PageResDto<>(List.of(), 0, pn, ps));
    }

    @PostMapping
    public ResponseDto<Task> create(@Valid @RequestBody Task task) {
        return ResponseDto.success(taskService.create(task), "创建成功");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseDto<Task>> update(@PathVariable Long id, @Valid @RequestBody Task task) {
        return taskService.update(id, task)
                .map(updated -> ResponseEntity.ok(ResponseDto.success(updated, "更新成功")))
                .orElse(ResponseEntity.ok(ResponseDto.fail("任务不存在")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDto<Map<String, Object>>> delete(@PathVariable Long id) {
        boolean ok = taskService.delete(id);
        if (!ok) return ResponseEntity.ok(ResponseDto.fail("任务不存在"));
        return ResponseEntity.ok(ResponseDto.success(Collections.singletonMap("success", true), "删除成功"));
    }

    @GetMapping("/stats")
    public ResponseDto<TaskStatsDto> stats() { return ResponseDto.success(taskService.stats()); }

    @GetMapping("/recent")
    public ResponseDto<List<Task>> recent(@RequestParam(defaultValue = "5") int limit) {
        return ResponseDto.success(taskService.recent(limit));
    }

    @GetMapping("/categories")
    public ResponseDto<List<CategoryDistributionDto>> categories() { return ResponseDto.success(taskService.categories()); }

    @GetMapping("/weekly-progress")
    public ResponseDto<List<Integer>> weeklyProgress() {
        return ResponseDto.success(taskService.weeklyProgress());
    }
}


