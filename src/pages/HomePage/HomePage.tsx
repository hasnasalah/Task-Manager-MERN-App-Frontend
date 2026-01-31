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
      <div className="hero-content">
      <h1>Project Manager App!</h1>
      <h3>Manage your projects and tasks efficiently</h3>
      <div className="buttons">
      <button className="logBtn" onClick={() => navigate("/login")}>Login</button>
      <button className="regBtn" onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
    </div>
  );
}

export default HomePage;
