import { useContext } from "react";
import TasksContext from "../context/TaskContext";

export default function TaskStats() {
      const context=useContext(TasksContext);
   if (!context) return null;
    const{tasks}=context;
  const total = tasks.length;
  const completed = tasks.filter(t => t.status==="done").length;
  const pending = total - completed;
  const highPriority = tasks.filter(t => t.priority === "High").length;

  return (
    <div className="task-stats">
      <p>Total: {total}</p>
      <p>Completed: {completed}</p>
      <p>Pending: {pending}</p>
      <p>High Priority: {highPriority}</p>
    </div>
  );
}