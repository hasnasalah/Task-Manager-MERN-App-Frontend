const BASE_URL = `${import.meta.env.VITE_API_URL}`;
import type { Project,ProjectFormData } from "../types";

export async function getProjects(token:string): Promise<Project[]> {

  try {
    const response = await fetch(`${BASE_URL}/api/projects`, {
method: 'GET',
headers: {
'Authorization':`Bearer ${token}`,
'Content-Type': 'application/json'
}
});
    if (!response.ok) throw new Error('API Error!');
    const data: Project[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return []; // <-- always return an array
  }
}
export async function createProject(
  formData: ProjectFormData,token:string
): Promise<Project> {
  try {
    const response = await fetch(`${BASE_URL}/api/projects`, {
      method: 'POST',
      headers: { 
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json' },
      
       body: JSON.stringify(formData),
  });

  const text = await response.text();
  if (!response.ok)   throw new Error(`API Error! ${text}`);
  const data: Project = JSON.parse(text);
  return data;
  } catch (error) {
    console.error(error);
    throw error; // <-- let the caller handle errors
  }
}
export async function updateProject(
id:string, formData: ProjectFormData,token:string,
): Promise<Project> {
  try {
    const response = await fetch(`${BASE_URL}/api/projects/${id}`, {
      method: 'PUT',
      headers: { 
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json' },
      
       body: JSON.stringify(formData),
  });

  const text = await response.text(); 
  if (!response.ok) throw new Error(`API Error! ${text}`);

  const data: Project = JSON.parse(text); 
  return data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

export async function deleteProject(
id:string,token:string,
): Promise<Project> {
  try {
    const response = await fetch(`${BASE_URL}/api/projects/${id}`, {
      method: 'Delete',
      headers: { 
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json' },
  });

  const text = await response.text(); 
  if (!response.ok) throw new Error(`API Error! ${text}`);

  const data: Project = JSON.parse(text); 
  return data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}