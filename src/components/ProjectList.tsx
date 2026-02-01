import type { ProjectListPropps } from "../types";
import ProjectCard from "./ProjectCard";


export default function ProjectList({projects}:ProjectListPropps) {
  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project._id} name={project.name} description={project.description} dueDate={project.dueDate} />
      ))}
    </div>
  );
}
