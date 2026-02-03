  import NavBar from "../../components/NavBar";
  import TaskList from "../../components/TaskList";
  import { getTasks } from "../../utilities/TasksApi";
  import AuthContext from "../../context/AuthContext";
  import { useContext,useState,useEffect } from "react";
  import EditModal from "../../components/EditTaskModal";
  import "../../App.css";
  import type{Task} from "../../types/index";
  import TasksContext from "../../context/TaskContext";
  import TaskFilters from "../../components/TaskFilter";
  import TaskStats from "../../components/TaskStats";
  import ProjectsContext from "../../context/ProjectsContext";
import { useParams } from "react-router-dom";




  export default function TaskDetailPage(){
    const   projectContext = useContext(ProjectsContext);
    const   taskContext = useContext(TasksContext);
    const { projects, setProjects } = projectContext ?? { projects: [], setProjects: () => {} }; 
     const { id: projectId } = useParams();
     const project=projects?.find(p=>p._id===projectId);

    const { tasks, setTasks } = taskContext ?? { tasks: [], setTasks: () => {} }; 
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState({ priority: "All"});
    
    const [isModalOpen, setIsModalOpen] = useState(false);
  const {token}=useContext(AuthContext);
  useEffect(()=>{
  async function fetchProjects(){
      if (!token) return;
      if(!projectId)return;
      const data= await getTasks(token,projectId);
      if(data)
          setTasks(data);
         setFilteredTasks(data);
  }
  fetchProjects();
      
  },[projectId]);
 

  return(
  <>
  <NavBar/>
  <TaskStats/>
  <TaskFilters/>
  <div className="board">
    <div className="left-side">
  <h1>Your Tasks</h1>
  <div> 
        <button onClick={() => setIsModalOpen(true)} className="EditProject-btn">+ Add New Task</button>
        {isModalOpen && (
          <EditModal onClose={() => setIsModalOpen(false)} />
        )}
    </div>
    </div>
  <TaskList/>




  </div>

  </>




  );



  }