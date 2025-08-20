package com.example.backendjava.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageResDto<T> {
    private List<T> items;
    private long total;
    private int pageNo;
    private int pageSize;
}


