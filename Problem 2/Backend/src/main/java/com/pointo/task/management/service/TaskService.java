package com.pointo.task.management.service;

import com.pointo.task.management.dto.TaskRequestDTO;
import com.pointo.task.management.entity.Task;

import java.util.List;

public interface TaskService {
    Task getById(Long id);
    List<Task> getAllTasks();
    Task createTask(TaskRequestDTO task);
    Task updateTask(Long id, TaskRequestDTO task);
    Task updateTaskStatus(Long id, Task.Status status);
    void softDeleteTask(Long id);
}
