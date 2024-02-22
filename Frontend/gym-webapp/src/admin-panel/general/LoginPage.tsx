import "../../assets/stylesheets/LoginPage.css"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import ActionAlert, { AlertType, AlertData } from "../../utils/ActionAlert";
import { useState } from "react";

type LoginDto = {
    username: string
    password: string
}

export default function LoginPage() {
    const navigate = useNavigate();
    const [alert, setAlert] = useState<AlertData | null>();
    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required()
    });
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginDto>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: LoginDto) => {
        await axios.post('http://localhost:8080/api/auth/login', data).then(response => {
            if (response.status === 200) {
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("role", response.data.roleName);
                sessionStorage.setItem("userId", response.data.userId);
                navigate("/manage");
            }}).catch(error => {
                console.error('Error during login:', error);
                if (error.response){
                    setAlert({
                        type: AlertType.Danger,
                        title: "Cannot log in",
                        message: "Wrong username or password"
                    })
                } else{
                    setAlert({
                        type: AlertType.Danger,
                        title: "Something went wrong",
                        message: "We couldn't send or receive this request"
                    });
                }
            })
    }

    return (
        <div className='container p-5 login-container'>
            {alert ? <ActionAlert data={alert} /> : null}
            <div className='border rounded'>
                <form className='p-5' onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username">Username:</label><br />
                    <input type="text" className={`form-control ${errors.username ? "input-invalid" : null}`} placeholder='User' {...register("username")} />
                    <p className="text-danger">{errors.username?.message}</p>
                    <label htmlFor="password">Password:</label><br />
                    <input type="password" className={`form-control ${errors.password ? "input-invalid" : null}`} placeholder='Password' {...register("password")} />
                    <p className="text-danger">{errors.password?.message}</p>
                    <input type="submit" value="Log in" className='btn btn-primary' />
                </form>
            </div>
            <Link to="/recovery">Forgot password?</Link>
        </div>
    )
}
