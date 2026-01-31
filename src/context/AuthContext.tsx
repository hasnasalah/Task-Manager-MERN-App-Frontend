import { createContext, useState } from "react";
import type {AuthProviderProps,AuthContextType,User} from "../types/index";



const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user:null,
  login: () => {},
  logout: () => {},
});


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const storedAuth = localStorage.getItem("auth");
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedAuth);
const [user, setUser] = useState<User | null>(null);

  const login = (data: { user: User; token: string }) => {
    setIsAuthenticated(true);
    setUser(data.user);
  };

  const logout = () => {
    setIsAuthenticated(false);
     localStorage.removeItem("auth");
     setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
