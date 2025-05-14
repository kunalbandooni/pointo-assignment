import Task from "./Task";

const TaskColumn = ({ title, tasks, onDelete, onMove, onSuccess }) => {
  return (
    <div className="task-column">
      <h2>{title}</h2>
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
  );
};

export default TaskColumn;