import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { AuthProviderProps, AuthContextType, User } from "../types/index";

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // useLocalStorage automatically reads and writes JSON
  const [auth, setAuth] = useLocalStorage<{ user: User; token: string } | null>("auth", null);

  const login = (data: { user: User; token: string }) => {
    setAuth(data); // store user + token in localStorage
  };

  const logout = () => {
    setAuth(null); // remove from localStorage
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!auth,
        user: auth?.user || null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
