 import type { modalClose,ProjectFormData,Project } from "../types";
 import { useState,useContext } from "react";
import type {ChangeEvent,FormEvent}from 'react';
import { createProject,updateProject } from "../utilities/ProjectApi";
import AuthContext from "../context/AuthContext";
import ProjectsContext from "../context/ProjectsContext";



export default function EditModal({ onClose, projectToEdit }: modalClose) {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: projectToEdit?.name || "",
    description: projectToEdit?.description || "",
    DueDate: projectToEdit ? new Date(projectToEdit.DueDate) : new Date(),
  });

  const { token } = useContext(AuthContext);
  const projectsContext = useContext(ProjectsContext);

  if (!projectsContext) return <p>Loading...</p>;
  const { projects, setProjects } = projectsContext;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
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
       if (projectToEdit) {
      const data = await updateProject(projectToEdit._id, formData, token);

      const updatedProject: Project = {
         ...projectToEdit, 
        ...formData,
        DueDate: data.DueDate ? new Date(data.DueDate) : projectToEdit.DueDate,
        _id: projectToEdit._id,
      };

      setProjects(prev =>
        prev.map(p => (p._id === projectToEdit._id ? updatedProject : p))
      );
      } else {
        const data: Project = await createProject(formData, token);
        setProjects(prev => [...prev, data]);
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="project-modal-overlay">
      <div className="project-modal">
        <div className="modal">
          <h2>{projectToEdit ? "Edit Project" : "Add New Project"}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Project name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChangeText}
            />
            <input
              type="date"
              name="DueDate"
              value={(formData.DueDate.toISOString().split("T")[0])}
              onChange={handleChange}
            />
            <div className="modal-actions">
              <button type="submit">Save</button>
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
