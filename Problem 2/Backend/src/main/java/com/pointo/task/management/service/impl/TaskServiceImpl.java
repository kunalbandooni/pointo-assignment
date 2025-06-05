package com.pointo.task.management.service.impl;

import com.pointo.task.management.dto.TaskRequestDTO;
import com.pointo.task.management.entity.Task;
import com.pointo.task.management.exception.ValidationException;
import com.pointo.task.management.repo.TaskRepository;
import com.pointo.task.management.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task getById(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new ValidationException("Task not found"));
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAllByDeletedFalse();
    }

    @Override
    public Task createTask(TaskRequestDTO dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setPriority(dto.getPriority() == null ? Task.Priority.LOW : dto.getPriority());
        task.setStatus(dto.getStatus());
        task.setDueDate(dto.getDueDate());
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long id, TaskRequestDTO dto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Task not found"));

        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus());
        task.setPriority(dto.getPriority() == null ? task.getPriority() : dto.getPriority());
        task.setDueDate(dto.getDueDate());

        return taskRepository.save(task);
    }

    @Override
    public Task updateTaskStatus(Long id, Task.Status status) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Task not found"));

        task.setStatus(status);
        return taskRepository.save(task);
    }

    @Override
    public void softDeleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Task not found"));
        task.setDeleted(true);
        taskRepository.save(task);
    }

}
