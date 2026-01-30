import {createContext,useEffect} from 'react';
import type {ThemeProps,Childern} from "../types/index";
import { useLocalStorage } from '../hooks/useLocalStorage';
  
const ThemeContext=createContext<ThemeProps|undefined>(undefined);

export const ThemeProvider=({children}:Childern)=>{
  const [theme, setTheme] = useLocalStorage<'light'|'dark'>('theme','light');
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
  useEffect(() => {
   document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

return (
<ThemeContext.Provider value={{theme,toggleTheme}}>
{children}
</ThemeContext.Provider>
);
}
export default ThemeContext;