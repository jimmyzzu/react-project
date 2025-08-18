package com.example.backendjava.config;

import com.example.backendjava.entity.Task;
import com.example.backendjava.repository.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(TaskRepository taskRepository) {
        return args -> {
            if (taskRepository.count() > 0) return;

            Task t1 = new Task();
            t1.setTitle("完成项目文档");
            t1.setDescription("编写项目技术文档和用户手册");
            t1.setStatus("completed");
            t1.setPriority("high");
            t1.setCategory("文档任务");
            t1.setCompletedAt(OffsetDateTime.now().minusDays(2));

            Task t2 = new Task();
            t2.setTitle("代码审查");
            t2.setDescription("审查团队成员的代码提交");
            t2.setStatus("pending");
            t2.setPriority("medium");
            t2.setCategory("开发任务");
            t2.setDueDate(LocalDate.now().plusDays(3));

            Task t3 = new Task();
            t3.setTitle("团队会议");
            t3.setDescription("每周团队进度同步会议");
            t3.setStatus("pending");
            t3.setPriority("low");
            t3.setCategory("管理任务");
            t3.setDueDate(LocalDate.now().plusDays(1));

            Task t4 = new Task();
            t4.setTitle("系统测试");
            t4.setDescription("执行完整的系统集成测试");
            t4.setStatus("overdue");
            t4.setPriority("high");
            t4.setCategory("测试任务");
            t4.setDueDate(LocalDate.now().minusDays(1));

            Task t5 = new Task();
            t5.setTitle("UI设计优化");
            t5.setDescription("优化用户界面的视觉效果");
            t5.setStatus("completed");
            t5.setPriority("medium");
            t5.setCategory("设计任务");
            t5.setCompletedAt(OffsetDateTime.now().minusDays(5));

            Task t6 = new Task();
            t6.setTitle("数据库优化");
            t6.setDescription("优化数据库查询性能");
            t6.setStatus("pending");
            t6.setPriority("high");
            t6.setCategory("开发任务");
            t6.setDueDate(LocalDate.now().plusDays(2));

            Task t7 = new Task();
            t7.setTitle("API文档更新");
            t7.setDescription("更新API接口文档");
            t7.setStatus("completed");
            t7.setPriority("low");
            t7.setCategory("文档任务");
            t7.setCompletedAt(OffsetDateTime.now().minusDays(3));

            Task t8 = new Task();
            t8.setTitle("性能测试");
            t8.setDescription("执行系统性能压力测试");
            t8.setStatus("pending");
            t8.setPriority("medium");
            t8.setCategory("测试任务");
            t8.setDueDate(LocalDate.now().plusDays(4));

            taskRepository.save(t1);
            taskRepository.save(t2);
            taskRepository.save(t3);
            taskRepository.save(t4);
            taskRepository.save(t5);
            taskRepository.save(t6);
            taskRepository.save(t7);
            taskRepository.save(t8);
        };
    }
}


