import { useState } from "react";
import EditTaskForm from "./EditTaskForm";
import ConfirmDialog from "./ConfirmDialog";
import "../styles/Task.css";

const Task = ({ id, title, description, dueDate, createdAt, updatedAt, status, onDelete, onMove, onSuccess }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const statusOrder = ["TO_DO", "IN_PROGRESS", "DONE"];
  const currentIndex = statusOrder.indexOf(status);

  const taskData = { id, title, description, dueDate, createdAt, updatedAt, status };

  const handleDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="task-card">
        <div className="task-card-header">
          <h3>{title}</h3>
          <div className="task-card-actions">
            {currentIndex > 0 && (
              <button
                className="move-btn"
                title="Move to previous column"
                onClick={() => onMove(id, statusOrder[currentIndex - 1])}
              >
                🔙
              </button>
            )}
            {currentIndex < statusOrder.length - 1 && (
              <button
                className="move-btn"
                title="Move to next column"
                onClick={() => onMove(id, statusOrder[currentIndex + 1])}
              >
                🔜
              </button>
            )}
            <button className="edit-btn" onClick={() => setShowEdit(true)}>✏️</button>
            <button className="delete-btn" onClick={() => setShowDeleteConfirm(true)}>🗑️</button>
          </div>
        </div>
        <p title={description || "No Description"}>
          {description || <span className="no-description">No Description</span>}
        </p>
        <small><strong>Due:</strong> {new Date(dueDate).toLocaleDateString()}</small><br />
        <small><strong>Created:</strong> {new Date(createdAt).toLocaleDateString()}</small><br />
        <small><strong>Updated:</strong> {new Date(updatedAt).toLocaleDateString()}</small>
      </div>

      {showEdit && (
        <EditTaskForm
          task={taskData}
          onClose={() => setShowEdit(false)}
          onSuccess={() => {
            setShowEdit(false);
            onSuccess();
          }}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmDialog
          title="Confirm Deletion"
          message={`Are you sure you want to delete the task "${title}"?`}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
};

export default Task;