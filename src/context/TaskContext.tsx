import { createContext, useState } from "react";
import type { Task } from "../types";

const TasksContext = createContext<{
    tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
} | null>(null);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <TasksContext.Provider value={{tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}


export default TasksContext;