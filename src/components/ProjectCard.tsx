import type { ProjectItemProps } from "../types";

export default function ProjectCard({name,description,dueDate}: ProjectItemProps) {
  return (
    <div className="project-card">
      <h2>{name}</h2>
      <p>{description}</p>
      <p className="due-date">
        Due: {dueDate.toLocaleDateString()}
      </p>
      <div className="projectBtn">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}
