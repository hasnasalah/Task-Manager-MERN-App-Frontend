  import NavBar from "../../components/NavBar";
  import ProjectList from "../../components/ProjectList";
  import { getProjects } from "../../utilities/ProjectApi";
  import AuthContext from "../../context/AuthContext";
  import { useContext,useState,useEffect } from "react";
  import EditModal from "../../components/EditProjectModal";
  import "../../App.css";
  import "../Dashboard/dashboard.css";
  import ProjectsContext from "../../context/ProjectsContext";




  export default function DashboardPage(){
    const context = useContext(ProjectsContext);
    const { projects, setProjects } = context ?? { projects: [], setProjects: () => {} }; 
    const [isModalOpen, setIsModalOpen] = useState(false);
  const {token}=useContext(AuthContext);
  useEffect(()=>{
  async function fetchProjects(){
      if (!token) return;
      const data= await getProjects(token);
      if(data)
          setProjects(data);
  }
  fetchProjects();
      
  },[token]);
  console.log(token);

  return(
  <>
  <NavBar/>
  <div className="board">
    <div className="left-side">
  <h1>Your Projects</h1>
     {projects.length === 0 ? (
            <div className="no-projects-message">
              <p>You don't have any projects yet. Click below to add your first project!</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="EditProject-btn"
              >
                + Add New Project
              </button>
            </div>
          ) : (
            <div className="project-list-wrapper">
              <button
                onClick={() => setIsModalOpen(true)}
                className="EditProject-btn"
              >
                + Add New Project
              </button>
              <ProjectList />
            </div>
          )}

          {isModalOpen && <EditModal onClose={() => setIsModalOpen(false)} />}
        </div>
      </div>

  </>




  );



  }