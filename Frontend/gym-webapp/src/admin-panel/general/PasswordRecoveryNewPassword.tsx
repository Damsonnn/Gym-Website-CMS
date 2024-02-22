import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import axios from "axios";
import ActionAlert, { AlertType, AlertData } from "../../utils/ActionAlert";
import { config } from "../../utils/JWTConfig";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

type PasswordChangeForm = {
    password: string
    repeatPassword: string
}

type PasswordResetDto = {
    token: string
    password: string
}

export default function PasswordRecoveryNewPassword() {
    const [alert, setAlert] = useState<AlertData | null>();
    const schema = yup.object().shape({
        password: yup.string().required(),
        repeatPassword: yup.string().required().oneOf([yup.ref("password")], "Passwords does not match")
    });
    const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordChangeForm>({
        resolver: yupResolver(schema)
    });
    const { token } = useParams();

    const onSubmit = async (data: PasswordChangeForm) => {
        const dataToSend = {
            token: token,
            password: data.password
        } as PasswordResetDto
        await axios.put('http://localhost:8080/api/auth/reset-password', dataToSend, config).then(response => {
            console.log(response)
            if (response.status === 200) {
                setAlert({
                    type: AlertType.Success,
                    title: "Success",
                    message: "PasswordChangedSuccessfully"
                });
                reset();
            }}).catch(error => {
                console.error('Error during changing password:', error);
                if (error.response){
                    setAlert({
                        type: AlertType.Danger,
                        title: "Password change failed",
                        message: error.response.data.message
                    });
                    reset();
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
                    <label htmlFor="password">New password:</label>
                    <input type="password" className={`form-control ${errors.password ? "input-invalid" : null}`} placeholder='New password' {...register("password")} />
                    <p className="text-danger">{errors.password?.message}</p>
                    <label htmlFor="password">Repeat new password:</label>
                    <input type="password" className={`form-control ${errors.repeatPassword ? "input-invalid" : null}`} placeholder='Repeat new password' {...register("repeatPassword")} />
                    <p className="text-danger">{errors.repeatPassword?.message}</p>
                    <input type="submit" value="Save new password" className='btn btn-primary' />
                </form>
            </div>
            <Link to={"/login"}>Get back to log in page</Link>
        </div>
    )
}