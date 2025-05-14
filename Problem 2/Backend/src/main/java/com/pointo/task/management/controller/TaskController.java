package com.pointo.task.management.controller;


import com.pointo.task.management.dto.TaskRequestDTO;
import com.pointo.task.management.entity.Task;
import com.pointo.task.management.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/{id}")
    public Task getById(@PathVariable Long id) {
        return taskService.getById(id);
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public Task createTask(@Valid @RequestBody TaskRequestDTO task) {
        return taskService.createTask(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @Valid @RequestBody TaskRequestDTO  task) {
        return taskService.updateTask(id, task);
    }

    @PatchMapping("/{id}")
    public Task updateStatus(@PathVariable Long id, @RequestParam(name = "status", required = true)Task.Status status) {
        return taskService.updateTaskStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskService.softDeleteTask(id);
        return "Task soft deleted successfully";
    }
}
