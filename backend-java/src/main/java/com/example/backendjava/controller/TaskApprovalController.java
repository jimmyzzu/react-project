package com.example.backendjava.controller;

import com.example.backendjava.entity.TaskApproval;
import com.example.backendjava.dto.ResponseDto;
import com.example.backendjava.service.TaskApprovalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/approvals")
@CrossOrigin(origins = "*")
public class TaskApprovalController {
    private final TaskApprovalService service;

    public TaskApprovalController(TaskApprovalService service) {
        this.service = service;
    }

    @PostMapping("/submit")
    public ResponseDto<TaskApproval> submit(@RequestBody Map<String, Object> body) {
        Long taskId = ((Number) body.get("taskId")).longValue();
        String reviewer = (String) body.getOrDefault("reviewer", "");
        String comment = (String) body.getOrDefault("comment", "");
        return ResponseDto.success(service.submit(taskId, reviewer, comment), "提交成功");
    }

    @PostMapping("/{id}/status")
    public ResponseEntity<ResponseDto<TaskApproval>> changeStatus(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        String status = (String) body.get("status");
        String comment = (String) body.get("comment");
        return service.updateStatus(id, status, comment)
                .map(updated -> ResponseEntity.ok(ResponseDto.success(updated, "更新成功")))
                .orElse(ResponseEntity.ok(ResponseDto.fail("审批记录不存在")));
    }

    @GetMapping("/task/{taskId}")
    public ResponseDto<List<TaskApproval>> list(@PathVariable Long taskId) {
        return ResponseDto.success(service.listByTask(taskId));
    }
}


