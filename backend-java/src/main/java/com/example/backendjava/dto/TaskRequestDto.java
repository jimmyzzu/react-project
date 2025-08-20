package com.example.backendjava.dto;

import lombok.Data;

@Data
public class TaskRequestDto extends PageReqDto {
    private String owner;
    private String role; // reviewer / user
    private String status; // review status filter, e.g., processing
}


