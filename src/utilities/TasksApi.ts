const BASE_URL = `${import.meta.env.VITE_API_URL}/api/tasks`;
import type { Task,tasksFormData } from "../types";

export async function getTasks(token:string,projectId:string): Promise<Task[]> {

  try {
    const response = await fetch(`${BASE_URL}/${projectId}/tasks`, {
method: 'GET',
headers: {
'Authorization':`Bearer ${token}`,
'Content-Type': 'application/json'
}
});
    if (!response.ok) throw new Error('API Error!');
    const data: Task[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return []; 
  }
}
export async function createTask(
  formData: tasksFormData,projectId:string,token:string
): Promise<Task> {
  try {
     const response = await fetch(`${BASE_URL}/${projectId}/tasks`, {
      method: 'POST',
      headers: { 
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json' },
      
       body: JSON.stringify(formData),
  });

  const text = await response.text();
  if (!response.ok)   throw new Error(`API Error! ${text}`);
  const data: Task = JSON.parse(text);
  return data;
  } catch (error) {
    console.error(error);
    throw error; // <-- let the caller handle errors
  }
}
export async function updateTask(
id:string,   toUpdate: Partial<Task>,token:string,
): Promise<Task> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json' },
      
       body: JSON.stringify(toUpdate),
  });

  const text = await response.text(); 
  if (!response.ok) throw new Error(`API Error! ${text}`);

  const data: Task = JSON.parse(text); 
  return data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

export async function deleteTask(
id:string,token:string,
): Promise<Task> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'Delete',
      headers: { 
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json' },
  });

  const text = await response.text(); 
  if (!response.ok) throw new Error(`API Error! ${text}`);

  const data: Task = JSON.parse(text); 
  return data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}