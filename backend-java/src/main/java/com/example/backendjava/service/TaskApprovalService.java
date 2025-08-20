package com.example.backendjava.service;

import com.example.backendjava.entity.TaskApproval;
import com.example.backendjava.repository.TaskApprovalRepository;
import com.example.backendjava.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskApprovalService {
    private final TaskApprovalRepository repository;
    private final TaskRepository taskRepository;

    public TaskApprovalService(TaskApprovalRepository repository, TaskRepository taskRepository) {
        this.repository = repository;
        this.taskRepository = taskRepository;
    }

    public TaskApproval submit(Long taskId, String reviewer, String comment) {
        TaskApproval taskApproval = new TaskApproval();
        taskApproval.setTaskId(taskId);
        taskApproval.setReviewer(reviewer);
        taskApproval.setComment(comment);
        taskApproval.setStatus("submitted");
        return repository.save(taskApproval);
    }

    public Optional<TaskApproval> updateStatus(Long id, String status, String comment) {
        return repository.findById(id).map(task -> {
            task.setStatus(status);
            if (comment != null) task.setComment(comment);
            TaskApproval saved = repository.save(task);
            // 同步更新 Task 审核状态
            taskRepository.findById(task.getTaskId()).ifPresent(t -> {
                // 审核中转 processing，审核完成转 approved，驳回转 rejected
                if ("processing".equals(status) || "approved".equals(status) || "rejected".equals(status)) {
                    t.setReviewStatus(status);
                    taskRepository.save(t);
                }
            });
            return saved;
        });
    }

    public List<TaskApproval> listByTask(Long taskId) {
        return repository.findByTaskIdOrderByCreatedAtAsc(taskId);
    }
}


