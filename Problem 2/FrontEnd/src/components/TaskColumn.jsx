import Task from "./Task";
import "../styles/TaskColumn.css";

const TaskColumn = ({ title, tasks, onDelete, onMove, onSuccess }) => {
  const columnClass =
    title === "TODO"
      ? "todo-column"
      : title === "DONE"
      ? "done-column"
      : "inprogress-column";

  return (
    <div className={`task-column ${columnClass}`}>
      <div className="column-header">
        <h2>{title.replace("_", " ")}</h2>
      </div>
      <div className="task-list-wrapper">
        {tasks.map((task) => (
          <Task
            key={task.id}
            {...task}
            onDelete={() => onDelete(task.id)}
            onMove={onMove}
            onSuccess={onSuccess}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;