import "../../assets/stylesheets/LoginPage.css"
import { Link, useNavigate  } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

type LoginDto = {
  username: string
  password: string
}

export default function LoginPage() {
  const navigate = useNavigate(); 
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
  });
  const {register, handleSubmit, formState: { errors }, reset} = useForm<LoginDto>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: LoginDto) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', data);

      if (response.status === 200) {
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
        <form className='p-5' onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username:</label><br/>
          <input type="text" className={`form-control ${errors.username ? "input-invalid" : null}`} placeholder='User' {...register("username")}/>
          <p className="text-danger">{errors.username?.message}</p>
          <label htmlFor="password">Password:</label><br/>
          <input type="password" className={`form-control ${errors.password ? "input-invalid" : null}`} placeholder='Password' {...register("password")}/>
          <p className="text-danger">{errors.password?.message}</p>
          <input type="submit" value="Log in" className='btn btn-primary'/>
        </form>
      </div>
      <Link to="/recovery">Forgot password?</Link>
    </div>
  )
}
