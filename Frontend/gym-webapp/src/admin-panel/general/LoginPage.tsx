import {useState, ChangeEvent, FormEvent} from 'react'
import "../../assets/stylesheets/LoginPage.css"
import { Link, useNavigate  } from 'react-router-dom'
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', loginData);

      if (response.status === 200) {
        console.log('Login successful');
        console.log(response.data);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("role", response.data.roleName);
        console.log(sessionStorage.getItem("role"));
        navigate("/manage");
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  return (
    <div className='container p-5 login-container'>
      <div className='border rounded'>
        <form className='p-5' onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label><br/>
          <input type="text" name="username" id="username" className='form-control' placeholder='User' value={loginData.username} onChange={handleInputChange}/><br/>
          <label htmlFor="password">Password:</label><br/>
          <input type="password" name="password" id="password" className='form-control' placeholder='Password' value={loginData.password} onChange={handleInputChange}/><br/>
          <input type="submit" value="Log in" className='btn btn-primary'/>
        </form>
      </div>
      <Link to="/recovery">Forgot password?</Link>
    </div>
  )
}
