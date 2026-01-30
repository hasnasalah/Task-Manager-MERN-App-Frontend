import  AuthContext  from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import {useContext}from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="background">
      <h1>Project Manager App!</h1>
      <h3>Manage your projects and tasks efficiently</h3>
      <div className="buttons">
      <button className="logBtn" onClick={() => navigate("/login")}>Sign In</button>
      <button className="registerBtn" onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
}

export default HomePage;
