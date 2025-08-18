package com.example.backendjava.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TaskStatsDto {
    private long total;
    private long completed;
    private long pending;
    private long overdue;

    public TaskStatsDto(long total, long completed, long pending, long overdue) {
        this.total = total;
        this.completed = completed;
        this.pending = pending;
        this.overdue = overdue;
    }
}


