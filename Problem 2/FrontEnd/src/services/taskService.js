import { API_URL, TASK_SEGMENT } from "../constants/constants";

export const fetchAllTasks = async () => {
  const res = await fetch(`${API_URL}/${TASK_SEGMENT}`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

export const createTask = async (task) => {
  const res = await fetch(`${API_URL}/${TASK_SEGMENT}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${TASK_SEGMENT}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};

export const updateTaskStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/${TASK_SEGMENT}/${id}?status=${status}`, {
    method: 'PATCH',
  });

  if (!res.ok) {
    throw new Error("Failed to update task status");
  }
};

export const updateTask = async (id, updatedTask) => {
  const response = await fetch(`${API_URL}/${TASK_SEGMENT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify({
      ...updatedTask,
      dueDate: new Date(updatedTask.dueDate).getTime(),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
};