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
  login: (data:{user:User,token:string}) => void;
  logout: () => void;
}
export type ProtectedRouteProps = {
  children: React.ReactNode;
};
export type Task = {
  _id: string;
  title: string;
  body: string;
};
export type Project = {
  _id: string;
  name: string;
  description: string;
  dueDate: Date;
};
export type User = {
  firstName: string;
  lastName: string;
  email:string;
  password?:string;
};
export type LoginUser={
   email:string;
  password:string;
}
export type CreateNoteData = {
  title: string;
  description: string;
  status:["To Do","In Progress","Done"];
  priority:["Low","Medium","High"];
};