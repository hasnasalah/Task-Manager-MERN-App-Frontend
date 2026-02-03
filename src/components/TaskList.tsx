import TaskCard from "./TaskCard";
import TasksContext from "../context/TaskContext";
import "../App.css"
import { useContext } from "react";


export default function ProjectList() {
  const context=useContext(TasksContext);
   if (!context) return null;
     const { tasks } = context;
  return (
    <div className="tasks-list">
      {tasks.map(task => (
        <TaskCard key={task._id}   task={task}/>
      ))}
    </div>
  );
}
