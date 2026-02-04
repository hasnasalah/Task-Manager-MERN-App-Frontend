import './App.css';
import {Route,Routes,BrowserRouter as Router} from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import TaskDetailPage from './pages/TaskDetailPage/TaskDetailPage';
import ProtectedRoute from "./components/ProtectedRoute"; 
import ThemeContext from './context/ThemeContext';
import { useContext } from 'react';
function App() {
 const {theme}=useContext(ThemeContext)!;
  return (
    <>
     <div className={`app-container ${theme}`}>
    <Router>
     <Routes>
  <Route path="/" element={<HomePage/>}/>
   <Route path="/home" element={<HomePage/>}/>
   <Route path="/login" element={<LoginPage/>}/>
   <Route path="/register" element={<RegisterPage/>}/>
   <Route path="/projects" element={<ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>}/>
  <Route path="/projects/:projectId" element={
  <ProtectedRoute>
    <TaskDetailPage />
  </ProtectedRoute>}/>
</Routes>
</Router>
</div>
    </>
  )
}

export default App
