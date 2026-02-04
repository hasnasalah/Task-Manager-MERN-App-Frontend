  import NavBar from "../../components/NavBar";
  import TaskList from "../../components/TaskList";
  import { getTasks } from "../../utilities/TasksApi";
  import AuthContext from "../../context/AuthContext";
  import { useContext,useState,useEffect } from "react";
  import AddTaskModal from "../../components/AddTaskModal";
  import "../../App.css";
  import "./taskDetailPage.css";
  import type{Filters} from "../../types/index";
  import TasksContext from "../../context/TaskContext";
  import TaskFilter from "../../components/TaskFilter";
  import TaskStats from "../../components/TaskStats";
  import { useNavigate, useParams } from "react-router-dom";
  import ProjectsContext from "../../context/ProjectsContext";


  export default function TaskDetailPage(){
    const   taskContext = useContext(TasksContext);
     const { projectId } = useParams<{ projectId: string }>();
     const navigate=useNavigate();
    const { tasks, setTasks } = taskContext ?? { tasks: [], setTasks: () => {} };  
      const [filters, setFilters] = useState<Filters>({
    priority: "All",
  }); 
    const [isModalOpen, setIsModalOpen] = useState(false);
  const {token}=useContext(AuthContext);
  const projectsContext = useContext(ProjectsContext);
  const projects = projectsContext?.projects ?? [];
const currentProject = projects.find(
  (p) => p._id === projectId
);
  useEffect(()=>{
  async function fetchProjects(){
      if (!token) return;
      if(!projectId)return;
      const data= await getTasks(token,projectId);
      if(data)
          setTasks(data); 
  }
  fetchProjects();
      
  },[projectId,token]);
  return(
  <>
  <NavBar/>
  <TaskStats/>
  <section className="project-header">
  <button
    className="back-btn"
    onClick={() => navigate("/projects")}
  >
    ← Back
  </button>

  <h1 className="project-title">
    {currentProject?.name}
  </h1>
</section>
  <div className="board">
    <div className="sub-left-side">
      <div className="Left-side">
  <h1>Your Tasks</h1>
        <button
  onClick={() => {
    
    setIsModalOpen(true);
  }} className="Add-task-btn">+ Add New Task</button>
        {isModalOpen && projectId && (
    <AddTaskModal
    onClose={() => setIsModalOpen(false)}
    
    projectId={projectId}
  />
)}
</div>
</div>

{tasks.length === 0 ? (
        <div className="no-tasks-message">
          <p>There are no tasks now. Click "Add New Task" to get started!</p>
        </div>
      ) :(
<TaskFilter setFilters={setFilters} filters={filters}/>
      )}
    </div>
  <TaskList filters={filters}/>
  </>




  );



  }