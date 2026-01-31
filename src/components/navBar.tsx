import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";
import  { FiSun, FiMoon } from "react-icons/fi";
import authContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../App.css";


export default function NavBar(){
const {theme,toggleTheme}=useContext(ThemeContext)!;
const{logout,user}=useContext(authContext);
console.log(user);
const navigate = useNavigate();
const handeleLogout=()=>{
    logout();
    navigate("/");
}

return(

<>
<div className="navBar">
<h1>Project Manager</h1>
<div className="miniNav">
{user&&
<p>Welcome, {user.firstName}</p>}
<button className="logoutBtn" onClick={handeleLogout}>Logout</button>
 <button className="toggle" onClick={toggleTheme}>
  {theme === "light" ? <FiMoon size={18} className="fi-icon"/> : <FiSun size={18} className="fi-icon" />}
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
    </div>
    </div>
</>

);





} 