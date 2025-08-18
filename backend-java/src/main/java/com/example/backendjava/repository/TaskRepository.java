package com.example.backendjava.repository;

import com.example.backendjava.dto.CategoryDistributionDto;
import com.example.backendjava.entity.Task;
import com.example.backendjava.repository.projection.WeeklyProgressProjection;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    long countByStatus(String status);

    @Query("SELECT t FROM Task t ORDER BY t.createdAt DESC")
    List<Task> findRecent(Pageable pageable);

    @Query("SELECT new com.example.backendjava.dto.CategoryDistributionDto(t.category, COUNT(t)) " +
            "FROM Task t GROUP BY t.category ORDER BY COUNT(t) DESC")
    List<CategoryDistributionDto> groupByCategory();

    @Query(value = "SELECT DATE(created_at) as date, COUNT(*) as total, SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) as completed FROM tasks WHERE created_at >= :since GROUP BY DATE(created_at) ORDER BY date", nativeQuery = true)
    List<WeeklyProgressProjection> weeklyProgress(@Param("since") LocalDate since);
}


