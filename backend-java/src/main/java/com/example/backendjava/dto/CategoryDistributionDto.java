package com.example.backendjava.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDistributionDto {
    private String name;
    private int value; // percent
    private long count;
    public CategoryDistributionDto(String name, long count) {
        this.name = name;
        this.count = count;
    }
}


