import { useContext } from "react";
import TasksContext from "../context/TaskContext";
import "../App.css";

export default function TaskStats() {
      const context=useContext(TasksContext);
   if (!context) return null;
    const{tasks}=context;
  const total = tasks.length;
  const completed = tasks.filter(t => t.status==="done").length;
  const pending = total - completed;
  const highPriority = tasks.filter(t => t.priority === "High").length;

 return (
    <div className="task-stats-container">
      <div className="stat-card total">
        <p>Total</p>
        <h3>{total}</h3>
      </div>
      <div className="stat-card completed">
        <p>Completed</p>
        <h3>{completed}</h3>
      </div>
      <div className="stat-card pending">
        <p>Pending</p>
        <h3>{pending}</h3>
      </div>
      <div className="stat-card high-priority">
        <p>High Priority</p>
        <h3>{highPriority}</h3>
      </div>
    </div>
  );
}