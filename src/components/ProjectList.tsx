import ProjectCard from "./ProjectCard";
import ProjectsContext from "../context/ProjectsContext";
import "../App.css"
import { useContext } from "react";


export default function ProjectList() {
  const context=useContext(ProjectsContext);
   if (!context) return null;
     const { projects } = context;
  return (
    <div className="project-list">
      {projects.map(project => (
        <ProjectCard key={project._id}   project={project}/>
      ))}
    </div>
  );
}
