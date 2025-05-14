import React, { useState } from "react";
import "../styles/AddTaskForm.css";
import { createTask } from "../services/taskService";

const AddTaskForm = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = {
      title,
      description,
      status: "TO_DO",
      dueDate: new Date(dueDate).getTime()
    };

    try {
      await createTask(task);
      onSuccess();
      onClose();
    } catch (err) {
      alert("Failed to create task.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <div className="form-actions">
            <button type="submit">Add Task</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
