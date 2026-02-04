import {useState,useContext} from "react";
import {loginUser} from "../../utilities/UsersApi";
import type {ChangeEvent, FormEvent} from 'react';
import type {LoginUser} from "../../types/index";
import "./loginPage.css";
import AuthContext from "../../context/AuthContext";
import { useNavigate,Link } from "react-router-dom";



export default function LoginPage(){
     const [error, setError] = useState<string | null>(null);
const[formData,setFormData]=useState<LoginUser>({
    email:'',
    password:''
});
const{login}=useContext(AuthContext);
const navigate=useNavigate();


 function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
}
  
  async function handleOnSubmit(event:FormEvent<HTMLFormElement>){

  event.preventDefault();
  setError(null);

  try {
    const data=await loginUser(formData);
    login(data);
     navigate("/projects");
  } catch (err: unknown) {
    if (err instanceof Error) {
    if (err.message === "USER_NOT_FOUND") {
      setError("There is No account associate with this email.");
    } else {
      setError("Login failed. Please try again.");
    }
}
  }
}


return(
<>
<div className="form-wrapper">
<div className="form-card" >
    <h1>Login</h1>
<form  onSubmit={handleOnSubmit}>
<input 
     type="email"
     name="email"
      placeholder="Email"
      value={formData.email}
       onChange={handleChange}/>
<input
    type="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    required
  />
  {error && <p className="error-message">{error}</p>}
<button className="loginBtn" type="submit">Login</button>
</form>

<div className="footer">Don't have an account? <Link to="/register">Register</Link></div>
</div>


</div>


</>




);



}
