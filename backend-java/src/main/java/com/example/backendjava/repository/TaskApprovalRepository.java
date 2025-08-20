package com.example.backendjava.repository;

import com.example.backendjava.entity.TaskApproval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskApprovalRepository extends JpaRepository<TaskApproval, Long> {
    List<TaskApproval> findByTaskIdOrderByCreatedAtAsc(Long taskId);
}


