package com.pointo.task.management.dto;

import com.pointo.task.management.entity.Task.Priority;
import com.pointo.task.management.entity.Task.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskRequestDTO {
    @NotBlank
    private String title;
    private String description;
    @NotNull
    private Status status;
    private Priority priority;
    private Long dueDate;
}
