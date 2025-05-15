import { useState } from "react";
import { updateTask } from '../services/taskService';
import "../styles/Modal.css";

const EditTaskForm = ({ task, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: new Date(task.dueDate).toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateTask(task.id, form);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="TO_DO">TO DO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <label>
          Priority
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </label>
        <label>
          Due Date
          <input
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
          />
        </label>
        <div className="modal-actions">
          <button onClick={handleUpdate}>Update</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskForm;