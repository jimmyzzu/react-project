package com.example.backendjava.repository.projection;

import java.time.LocalDate;

public interface WeeklyProgressProjection {
    LocalDate getDate();
    int getTotal();
    int getCompleted();
}


