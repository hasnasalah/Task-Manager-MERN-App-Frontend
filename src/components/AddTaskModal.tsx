import type { AddTaskModalProps, Task, tasksFormData } from "../types";
import { useState, useContext } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { createTask } from "../utilities/TasksApi";
import AuthContext from "../context/AuthContext";
import TasksContext from "../context/TaskContext";
import "../App.css";
import "../pages/TaskDetailPage/taskDetailPage.css"


export default function AddTaskModal({ onClose, projectId }: AddTaskModalProps) {
  const [formData, setFormData] = useState<tasksFormData>({
    title: "",
    description: "",
    status: "todo",
    priority: "Low",
  });

  const { token } = useContext(AuthContext);
  const tasksContext = useContext(TasksContext);

  if (!tasksContext) return <p>Loading...</p>;
  const { setTasks } = tasksContext;

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "DueDate" ? new Date(value) : value,
    }));
  }

  function handleChangeText(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;

    try {
      const newTask: Task = await createTask(formData,projectId , token);
      setTasks(prev => [...prev, newTask]);
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="task-modal-overlay">
      <div className="task-modal">
        <div className="modal">
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Task title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChangeText}
            />
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <div className="modal-actions">
              <button type="submit">Add Task</button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
