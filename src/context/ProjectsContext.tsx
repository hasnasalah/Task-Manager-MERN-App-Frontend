import { createContext, useState } from "react";
import type { Project } from "../types";

const ProjectsContext = createContext<{
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
} | null>(null);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}


export default ProjectsContext;