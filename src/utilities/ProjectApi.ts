const BASE_URL = `${import.meta.env.VITE_API_URL}`;
import type { Project } from "../types";

export async function getProjects(token:string): Promise<Project[]> {

  try {
    const response = await fetch(BASE_URL, {
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