import React, { useState, useEffect } from "react";
import TaskColumn from "./TaskColumn";
import AddTaskForm from "./AddTaskForm";
import { fetchAllTasks, deleteTask, updateTaskStatus } from "../services/taskService";
import '../styles/Body.css';

const Body = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const loadTasks = async () => {
    try {
      const data = await fetchAllTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSuccess = () => {
    setShowForm(false);
    setSuccessMessage("✅ Task added successfully!");
    loadTasks();
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setSuccessMessage("🗑️ Task deleted successfully!");
      loadTasks();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Failed to delete task:", err);
      alert("Failed to delete task.");
    }
  };

  const handleMove = async (id, newStatus) => {
    try {
      await updateTaskStatus(id, newStatus);
      setSuccessMessage("🔄 Task moved successfully!");
      loadTasks();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Failed to move task:", err);
      alert("Failed to move task.");
    }
  };

  return (
    <div className="body-wrapper">
      <div className="body-header">
        <button className="add-task-btn" onClick={() => setShowForm(true)}>
          + Add New Task
        </button>
      </div>

      {successMessage && (
        <div className="success-popup">{successMessage}</div>
      )}

      <div className="body-container">
        <TaskColumn title="TODO" 
          tasks={tasks.filter(task => task.status === "TO_DO")} 
          onDelete={handleDelete} 
          onMove={handleMove} 
          onSuccess={loadTasks}
        />
        <TaskColumn title="IN PROGRESS" 
          tasks={tasks.filter(task => task.status === "IN_PROGRESS")} 
          onDelete={handleDelete} 
          onMove={handleMove}
          onSuccess={loadTasks}
        />
        <TaskColumn title="DONE" 
          tasks={tasks.filter(task => task.status === "DONE")} 
          onDelete={handleDelete}
          onMove={handleMove} 
          onSuccess={loadTasks}
        />
      </div>

      {showForm && (
        <AddTaskForm
          onClose={() => setShowForm(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default Body;
