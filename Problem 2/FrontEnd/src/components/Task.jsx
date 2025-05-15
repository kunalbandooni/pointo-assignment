import { useState } from "react";
import {
  MdEdit,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdDelete,
} from "react-icons/md";
import EditTaskForm from "./EditTaskForm";
import ConfirmDialog from "./ConfirmDialog";
import { DESCRIPTION_SIZE } from "../constants/constants";
import "../styles/Task.css";

const Task = ({
  id,
  title,
  description,
  dueDate,
  createdAt,
  updatedAt,
  status,
  priority,
  onDelete,
  onMove,
  onSuccess,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const statusOrder = ["TO_DO", "IN_PROGRESS", "DONE"];
  const currentIndex = statusOrder.indexOf(status);

  const taskData = {
    id,
    title,
    description,
    dueDate,
    createdAt,
    updatedAt,
    status,
    priority,
  };

  const handleDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;
    setShowDetails(true);
  };

  return (
    <>
      <div
        className="task-card hoverable"
        onClick={handleCardClick}
        title="Click to view details"
      >
        <div className="task-card-actions">
          {currentIndex > 0 && (
            <button
              className="move-btn hoverable"
              title="Move to previous column"
              onClick={() => onMove(id, statusOrder[currentIndex - 1])}
            >
              <MdOutlineKeyboardDoubleArrowLeft />
            </button>
          )}
          {currentIndex < statusOrder.length - 1 && (
            <button
              className="move-btn hoverable"
              title="Move to next column"
              onClick={() => onMove(id, statusOrder[currentIndex + 1])}
            >
              <MdOutlineKeyboardDoubleArrowRight />
            </button>
          )}
          <button
            className="edit-btn hoverable"
            title="Edit task"
            onClick={() => setShowEdit(true)}
          >
            <MdEdit />
          </button>
          <button
            className="delete-btn hoverable"
            title="Delete task"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <MdDelete />
          </button>
        </div>

        <div className="task-title-row">
          <h2 className="task-title">{title}</h2>
          <div className={`priority-badge ${priority?.toLowerCase()}`}>
            {priority}
          </div>
        </div>

        <p className="task-description-preview">
          {description ? description.slice(0, DESCRIPTION_SIZE) + (description.length > DESCRIPTION_SIZE ? "..." : "") : <span className="no-description">No Description</span>}
        </p>

        <div className="task-due">
          <strong>Due:</strong> {new Date(dueDate).toLocaleDateString()}
        </div>

        <div className="task-meta">
          <small>
            <strong>Created:</strong> {new Date(createdAt).toLocaleDateString()}
          </small>
          <small>
            <strong>Updated:</strong> {new Date(updatedAt).toLocaleDateString()}
          </small>
        </div>
      </div>

      {showDetails && (
        <EditTaskForm
          task={taskData}
          onClose={() => setShowDetails(false)}
          onSuccess={() => {
            setShowDetails(false);
            onSuccess();
          }}
        />
      )}

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