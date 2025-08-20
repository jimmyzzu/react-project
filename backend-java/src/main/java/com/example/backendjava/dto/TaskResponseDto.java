package com.example.backendjava.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponseDto {
    private Long id;
    private String title;
    private String description;
    private String status;       // pending, completed, overdue
    private String priority;     // low, medium, high
    private String category;
    private String owner;        // 任务所属用户
    private String reviewStatus; // submitted, processing, approved, rejected
    private OffsetDateTime createdAt;
    private OffsetDateTime completedAt;
    private LocalDate dueDate;
    private OffsetDateTime updatedAt;
}


