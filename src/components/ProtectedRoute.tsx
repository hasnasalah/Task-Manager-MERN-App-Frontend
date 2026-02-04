import {useContext } from "react";
import {Navigate} from "react-router-dom";
import AuthoContex from "../context/AuthContext";
import type { ProtectedRouteProps } from "../types";


export default function ProtectedRoute ({children }: ProtectedRouteProps){
   const {isAuthenticated}=useContext(AuthoContex);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
