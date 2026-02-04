import TasksContext from "../context/TaskContext";
import AuthContext from "../context/AuthContext";
import {deleteTask,updateTask} from "../utilities/TasksApi";
import {useContext } from "react";
import type { Task } from "../types";
import "../App.css";

export default function ProjectCard({ task }: { task: Task}) {
  const { token } = useContext(AuthContext);
  const tasksContext = useContext(TasksContext);
 
  if (!tasksContext) return <p>Loading...</p>;
  const {setTasks } = tasksContext;

 async function handleDelete(){
    if (!token) return;
      await deleteTask(task._id, token);
 setTasks(prev => prev.filter(t => t._id !== task._id));
  }

 async function updateField(
    field: "status" | "priority",
    value: string
  ) {
    if (!token) return;
    setTasks(prev =>
      prev.map(t =>
        t._id === task._id ? { ...t, [field]: value } : t
      )
    );
    try {
      await updateTask(task._id, { [field]: value }, token);
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div className="task-card">
        <div className="title-side">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      </div>
      <div className="status-side">
         <select
          value={task.status}
          onChange={e => updateField("status", e.target.value)}
          className={`status-${task.status}`}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

         <select
          value={task.priority}
          onChange={e=>updateField("priority",e.target.value)}
          className={`priority-${task.priority}`}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        </div>

        <button className="task-deleteBtn" onClick={handleDelete}>
          Delete
        </button>
      </div>
  );
}
