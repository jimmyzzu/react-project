package com.example.backendjava.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "tasks")
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    // task的业务状态：未完成, 已完成, 逾期
    @Column(nullable = false)
    private String status = "pending"; // pending, completed, overdue

    // 任务所属用户
    @Column(name = "owner", nullable = false)
    private String owner = "";

    // 审批流状态：submitted, processing, approved, rejected
    @Column(name = "review_status", nullable = false)
    private String reviewStatus = "submitted";

    @Column(nullable = false)
    private String priority = "medium"; // low, medium, high

    @Column(nullable = false)
    private String category = "开发任务";

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @Column(name = "completed_at")
    private OffsetDateTime completedAt;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt = OffsetDateTime.now();

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }
}
