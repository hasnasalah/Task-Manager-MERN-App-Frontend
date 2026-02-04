 import {useState} from "react";
import registerUser from "../../utilities/UsersApi";
import type {ChangeEvent, FormEvent} from 'react';
import type {User} from "../../types/index";
import { Link } from "react-router-dom";
import "./RegisterPage.css"



export default function RegisterPage(){
     const [error, setError] = useState<string | null>(null);
      const [success, setSuccess] = useState<string | null>(null);
const[formData,setFormData]=useState<User>({
    firstName:'',
    lastName:'',
    email:'',
    password:''
});

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
    await registerUser(formData);
    setSuccess("Registration successful! You can now log in.");
  } catch (err: unknown) {
    if (err instanceof Error) {
    if (err.message === "USER_EXISTS") {
      setError("An account with this email already exists.");
    } else {
      setError("Registration failed. Please try again.");
    }
}
  }
}


return(
<>
<div className="form-wrapper">
<div className="form-card" >
    <h1>Register</h1>
<form  onSubmit={handleOnSubmit}>
    <input type="text"
    name="firstName"
           placeholder="First Name"
           value={formData.firstName}
           onChange={handleChange}
           required/>
    <input type="text"
    name="lastName"
    placeholder="Last Name"
    value={formData.lastName}
    onChange={handleChange}
    required/>
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
  {success&&<p className="sucess-message">{success}</p>}
<button className="registerBtn">Register</button>
</form>

<div className="footer">Already have and account? <Link to="/login">Login</Link></div>
</div>

</div>

</>




);



}
