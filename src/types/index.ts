import type { ReactNode } from "react";

export interface ThemeProps{
theme: 'light'|'dark',
  toggleTheme: () =>void;
}
export interface Childern{
    children:ReactNode;
}

export interface AuthProviderProps {
  children: ReactNode;
}
export interface AuthContextType {
  isAuthenticated: boolean;
  user:User|null;
  token:string|null;
  login: (data:{user:User,token:string}) => void;
  logout: () => void;
}
export type ProtectedRouteProps = {
  children: React.ReactNode;
};
export type Project = {
  _id: string;
  name: string;
  description: string;
  DueDate: Date;
};
export type User = {
  firstName: string;
  lastName: string;
  email:string;
  password?:string;
  token?:string|undefined;
};
export type LoginUser={
   email:string;
  password:string;
}

export type ProjectListPropps = {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};
export type ProjectItemProps={
project:Project;
}
export type ProjectCardContainerProps = {
  project: Project;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};
export type ProjectFormData = {
  name: string;
  description: string;
  DueDate: Date; 
};
export type modalClose={
  onClose:()=>void;
    projectToEdit?: Project; 
}
export type createProjectData={
  projects:Project[];
  setProjects:React.Dispatch<React.SetStateAction<Project[]>>;
}
export type Task={
  _id:string;
title:string;
description:string;
status: "todo"|"in-progress"|"done";
priority:"Low"|"Medium"|"High";
}
export type tasksFormData={
  title:string;
description:string;
status: "todo"|"in-progress"|"done";
priority:"Low"|"Medium"|"High";
}
export type Filters = {
  priority: "All" | "High" | "Medium" | "Low";
};

export type TaskFiltersProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};
export 
type AddTaskModalProps = {
  onClose: () => void;
  projectId: string; 
};