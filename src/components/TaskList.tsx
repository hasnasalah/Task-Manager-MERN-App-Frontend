import TaskCard from "./TaskCard";
import TasksContext from "../context/TaskContext";
import "../App.css"
import { useContext } from "react";
import type{taskListProps} from "../types/index";


export default function ProjectList({filters}:taskListProps) {
  const context=useContext(TasksContext);
   if (!context) return null;
     const { tasks } = context;

 const filteredTasks = tasks.filter(task => {
    if (filters.priority !=="All" && task.priority !== filters.priority) {
      return false;
    }
    return true;
  });


  return (
    <div className="tasks-list">
      {filteredTasks.map(task => (
        <TaskCard key={task._id}   task={task}/>
      ))}
    </div>
  );
}
