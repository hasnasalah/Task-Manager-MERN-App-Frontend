import NavBar from "../../components/NavBar";
import ProjectList from "../../components/ProjectList";
import { getProjects } from "../../utilities/ProjectApi";
import AuthContext from "../../context/AuthContext";
import { useContext,useState,useEffect } from "react";
import type { Project } from "../../types";




export default function DashboardPage(){
const[projects,setProjects]=useState<Project[]>([]);
const {user}=useContext(AuthContext);
useEffect(()=>{
async function fetchProjects(){
    if (!user?.token) return;
    const data= await getProjects(user.token);
    if(data)
        setProjects(data);
}
fetchProjects();
    
},[user]);

return(
<>
<NavBar/>
<div className="board">
<h1>Your Projects:</h1>
<button className="addProject">Add New Project</button>

<div className="project-list">
<ProjectList projects={projects} />
</div>




</div>

</>




);



}