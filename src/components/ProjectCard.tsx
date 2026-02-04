import ProjectsContext from "../context/ProjectsContext";
import AuthContext from "../context/AuthContext";
import {deleteProject} from "../utilities/ProjectApi"
import { useState, useContext } from "react";
import EditModal from "./EditProjectModal";
import type { Project } from "../types";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useContext(AuthContext);
  const projectsContext = useContext(ProjectsContext);

  if (!projectsContext) return <p>Loading...</p>;
  const { setProjects } = projectsContext;

  async function handleDelete(){
    if (!token) return;
      await deleteProject(project._id, token);
 setProjects(prev => prev.filter(t => t._id !== project._id));
  }

  return (
    <div className="project-card">
      <Link 
        to={`/projects/${project._id}`} 
        state={{ project }} 
        style={{ textDecoration: "none", color: "inherit" }}
      >
    
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <p className="due-date">
        Due: {project.DueDate ? new Date(project.DueDate).toLocaleDateString() : "—"}
      </p>
   </Link>
      <div className="projectBtn">
        <button onClick={() => setIsModalOpen(true)} className="project-editBtn">
          Edit
        </button>

        {isModalOpen && (
          <EditModal onClose={() => setIsModalOpen(false)} projectToEdit={project} />
        )}

        <button
          className="project-deleteBtn"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
    
  );
}
