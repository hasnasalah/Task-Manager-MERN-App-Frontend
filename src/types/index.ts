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
  login: () => void;
  logout: () => void;
}
export type ProtectedRouteProps = {
  children: React.ReactNode;
};