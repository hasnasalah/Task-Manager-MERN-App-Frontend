import type { ReactNode } from "react";

export interface ThemeProps{
theme: 'light'|'dark',
  toggleTheme: () =>void;
}
export interface Childern{
    children:ReactNode;
}